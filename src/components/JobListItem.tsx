"use client";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import {
  Banknote,
  Briefcase,
  Clock,
  Globe2,
  LucideIcon,
  MapPin,
} from "lucide-react";
import Image from "next/image";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface JobListItemProps {
  job: Job;
}

export default function JobListItem({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row p-6 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 self-center sm:self-start"
          >
            <Image
              src={companyLogoUrl || companyLogoPlaceholder}
              alt={`${companyName} logo`}
              width={100}
              height={100}
              className="rounded-lg"
            />
          </motion.div>
          <div className="flex-grow space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-primary">{title}</h2>
              <p className="text-lg text-muted-foreground">{companyName}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <InfoItem icon={Briefcase} text={type} />
              <InfoItem icon={MapPin} text={locationType} />
              <InfoItem icon={Globe2} text={location || "Worldwide"} />
              <InfoItem icon={Banknote} text={formatMoney(salary)} />
            </div>
          </div>
          <div className="flex flex-col justify-between items-end mt-4 sm:mt-0">
            <Badge variant="secondary" className="mb-2 text-nowrap shrink-0">
              {type}
            </Badge>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock size={14} />
              {relativeDate(createdAt)}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function InfoItem({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <motion.p
      className="flex items-center gap-2 text-muted-foreground"
      whileHover={{ scale: 1.03 }}
    >
      <Icon size={16} className="text-primary" />
      {text}
    </motion.p>
  );
}
