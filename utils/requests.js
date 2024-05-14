const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export const fetchProperties = async () => {
  try {
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`);

    if (!res.ok) {
      throw new Error("Failed to retrieve data");
    }

    return res.json();
  } catch (error) {
    return [];
  }
};

export const fetchSingleProperty = async (id) => {
  try {
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to retrieve data");
    }

    return res.json();
  } catch (error) {
    return {};
  }
};
