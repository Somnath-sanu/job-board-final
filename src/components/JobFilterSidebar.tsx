"use client";

import { useEffect, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { useRouter } from "next/navigation";
import { jobFilterSchema, JobFilterValues } from "@/lib/validation";
import { jobTypes } from "@/lib/job-types";

import LoadingButton from "./LoadingButton";

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

export default function JobFilterSidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [locations, setLocations] = useState([]);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // await delay(1000);
    try {
      const parsedValue = jobFilterSchema.parse({
        type: job,
        location,
        remote: isRemote,
      });
      // console.log({ parsedValue });

      const searchParams = new URLSearchParams({
        ...(parsedValue.type && { type: parsedValue.type }),
        ...(location && { location }),
        ...(parsedValue.remote && { remote: "true" }),
      });

      router.push(`/?${searchParams.toString()}`);
    } catch (error) {
      console.error(error);
    }

    if (isOpen) {
      setIsOpen(false);
    }
  };

  // console.log({ pending });

  useEffect(() => {
    function toogle() {
      setIsOpen(window.innerWidth >= 768);
    }
    window.addEventListener("resize", toogle);

    return () => {
      window.removeEventListener("resize", toogle);
    };
  }, []);

  useEffect(() => {
    async function fetchLocations() {
      const res = await fetch("/api/locations");
      const data = await res.json();

      setLocations(data.locations);
    }
    fetchLocations();
  }, []);

  useEffect(() => {
    setJob(defaultValues.type || "");
    setLocation(defaultValues.location || "");
    setIsRemote(defaultValues.remote || false);
  }, [defaultValues]);

  /**
   ** useCallback is used to memoize functions, preventing them from being recreated on every render unless their dependencies change.
   * 
   * When you replace useEffect with useCallback, the function that sets the state is not executed automatically. Instead, you get a memoized function that you would need to call explicitly. This is why the state doesn't update as expected.
   * 
    If you want to use useCallback, you would need to call the returned function manually, which is not the intended behavior for setting initial state based on props. Therefore, useEffect is the appropriate hook for this scenario.

    *?const memoizedCallback = useCallback(() => {
     setJob(defaultValues.type || "");
    setLocation(defaultValues.location || "");
    setIsRemote(defaultValues.remote || false);
    }, [defaultValues]);

    // You would need to call memoizedCallback() somewhere in your component

  */

  return (
    <>
      <Button
        variant="outline"
        className="fixed bottom-4 right-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter className="mr-2 h-4 w-4" />
        Filters
      </Button>

      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-background p-6 shadow-lg md:sticky md:top-10   md:w-72 h-fit mx-auto rounded-xl "
          >
            <form
              onSubmit={(e) =>
                startTransition(() => {
                  handleSubmit(e);
                })
              }
              className="space-y-6"
              key={JSON.stringify(defaultValues)}
            >
              <h2 className="text-lg font-semibold">Filter Jobs</h2>

              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <Select
                  value={job}
                  onValueChange={setJob}
                  defaultValue={defaultValues.type}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="All-types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All-types</SelectItem>
                    {jobTypes.map((type) => (
                      <SelectItem value={type} key={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={location}
                  onValueChange={setLocation}
                  defaultValue={defaultValues.location}
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="All-locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All-locations</SelectItem>
                    {locations?.map((loc, id) => (
                      <SelectItem key={id} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  className="bg-slate-500 border-none outline-none cursor-pointer"
                  id="remote"
                  checked={isRemote}
                  onCheckedChange={(checked) => setIsRemote(checked as boolean)}
                  defaultChecked={defaultValues.remote}
                />
                <Label htmlFor="remote" className="cursor-pointer">
                  Remote Job
                </Label>
              </div>

              <LoadingButton
                type="submit"
                className="w-full"
                loading={isPending}
              >
                Apply Filters
              </LoadingButton>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
