import { toast } from "sonner";

export const getLocationByIP = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    if (data && data.latitude && data.longitude) {
      return { lat: data.latitude, long: data.longitude, city: data.city };
    } else {
      toast.error("Unable to retrieve location from IP.");
    }
  } catch (error) {
    console.error("Error fetching location by IP:", error);
    toast.error("Failed to get location from IP.");
  }
};
