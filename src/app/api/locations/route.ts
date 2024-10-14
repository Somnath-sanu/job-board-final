import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const locations = (await prisma.job
      .findMany({
        where: {
          approved: true,
        },
        select: {
          location: true,
        },
        distinct: ["location"],
      })
      .then((locations) =>
        locations.map(({ location }) => location).filter(Boolean)
      )) as string[];
    return NextResponse.json({ locations });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something happened!" });
  }
}
