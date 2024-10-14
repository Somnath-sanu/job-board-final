"use client";
import { Job } from "@prisma/client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Briefcase, MapPin, Globe2, Banknote } from "lucide-react";
import Image from "next/image";
import { formatMoney } from "@/lib/utils";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import Link from "next/link";
import Markdown from "./Markdown";

interface JobPageProps {
  job: Job;
}

export default function JobPage({
  job: {
    title,
    description,
    companyName,
    companyLogoUrl,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
  },
}: JobPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl p-6"
    >
      <Card className="overflow-hidden">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-4 bg-secondary p-6"
        >
          <Image
            src={companyLogoUrl || companyLogoPlaceholder}
            alt={`${companyName} logo`}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-xl text-muted-foreground">{companyName}</p>
          </div>
        </motion.div>

        <div className="space-y-6 p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Badge variant="outline" className="flex items-center gap-2">
              <Briefcase size={16} />
              {type}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <MapPin size={16} />
              {locationType}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Globe2 size={16} />
              {location || "Worldwide"}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Banknote size={16} />
              {formatMoney(salary)}
            </Badge>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-semibold">Details</h2>
              <p className="whitespace-pre-wrap text-muted-foreground">
                Read carefully before applying{" "}
              </p>
            </div>
          </motion.div>
          {description && <Markdown>{description}</Markdown>}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
            {applicationUrl ? (
              <Link
                href={new URL(applicationUrl).origin}
                className="text-green-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {companyName}
              </Link>
            ) : (
              <span>{companyName}</span>
            )}
            {/* <Button asChild className="w-full sm:w-auto">
              <a href={applicationUrl} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button> */}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
