"use server";

import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import { Resend } from "resend";
import { EmailTemplate } from "@/components/email/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createJobPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    type,
    companyName,
    companyLogo,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;

  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      }
    );
    //https://cs3mq1kss5txwu8s.public.blob.vercel-storage.com/company_logos/full-stack-developer-aQMP9YN_VW.jpeg
    companyLogoUrl = blob.url;
  }

  try {
    await prisma.$transaction(
      async (tx) => {
        await tx.job.create({
          data: {
            slug,
            title: title.trim(),
            type,
            companyName: companyName.trim(),
            companyLogoUrl,
            locationType,
            location,
            applicationEmail: applicationEmail?.trim(),
            applicationUrl: applicationUrl?.trim(),
            description: description?.trim(),
            salary: parseInt(salary),
          },
        });
        const { data, error } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: ["somnathmishra100dbi@gmail.com"],
          subject: "New Job Added",
          react: EmailTemplate({
            title,
            type,
            companyName,
            location,
            applicationEmail,
            applicationUrl,
            salary,
          }),
        });

        console.log({ data, error });
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );
  } catch (error) {
    console.error(error);
  }

  // await prisma.job.create({
  //   data: {
  //     slug,
  //     title: title.trim(),
  //     type,
  //     companyName: companyName.trim(),
  //     companyLogoUrl,
  //     locationType,
  //     location,
  //     applicationEmail: applicationEmail?.trim(),
  //     applicationUrl: applicationUrl?.trim(),
  //     description: description?.trim(),
  //     salary: parseInt(salary),
  //   },
  // });

  redirect("/job-submitted");
}
