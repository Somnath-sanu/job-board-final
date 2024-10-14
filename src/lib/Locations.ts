"use server";

import prisma from "./prisma";

export const getAllLocations = async () => {
  const locations = (await prisma.job
    .findMany({
      select: {
        location: true,
      },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return locations;
};
