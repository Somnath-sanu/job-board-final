/* eslint-disable @typescript-eslint/no-unused-vars */

import { forwardRef, useMemo, useState } from "react";
import citiesList from "@/lib/cities-list";
import { Input } from "./ui/input";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [hasFocus, setHasFocus] = useState(false);

    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];

      const searchWords = locationSearchInput.split(" ");

      return citiesList
        .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase())
            )
        )
        .slice(0, 5);
    }, [locationSearchInput]);

    return (
      <div className="relative">
        <Input
          placeholder="Search for a city..."
          type="search"
          value={locationSearchInput}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          {...props}
          ref={ref}
        />
        {locationSearchInput.trim() && hasFocus && (
          <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
            {!cities.length && <p className="p-3">No results found.</p>}
            {cities.map((city) => (
              <button
                key={city}
                className="block w-full p-2 text-start"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                  setLocationSearchInput("");
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

/**
 * the reason onClick might not be working as expected is due to the way focus and blur events interact with the dropdown and input field.
 * *When you use onClick, the onBlur event of the input field might be triggered before the onClick event of the button, causing the dropdown to close before the click is registered.
  Using onMouseDown instead of onClick ensures that the event is captured before the input field loses focus, allowing the click to be registered properly. Here's a brief explanation of the relevant code:
 */
