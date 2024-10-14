import JobListItem from "@/components/JobListItem";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const unapprovedJobs = await prisma.job.findMany({
    where: {
      approved: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const user = await currentUser();
  if (!user || !isAdmin(user)) {
    redirect("/");
    throw new Error("Not authorized");
  }

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <h2 className="text-center">Admin Dashboard</h2>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved jobs :</h2>
        {unapprovedJobs.map((job) => (
          <Link key={job.id} href={`/admin/jobs/${job.slug}`} className="block">
            <JobListItem job={job} />
          </Link>
        ))}
        {unapprovedJobs.length === 0 && (
          <p className="text-muted-foreground">No unapproved jobs</p>
        )}
      </section>
    </main>
  );
}
