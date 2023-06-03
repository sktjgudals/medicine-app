export const tokenFetch = async (accessToken: string, refreshToken: string) => {
  const controller = new AbortController();
  //   setTimeout(() => {
  //     controller.abort();
  //   }, 2000);
  return fetch("/api/v1/token", {
    // signal: controller.signal,
    method: "POST",
    headers: {
      Authorization: JSON.stringify({
        access: accessToken,
        refresh: refreshToken,
      }),
    },
  })
    .then((data) => {
      return data.json();
    })
    .catch((e) => {
      console.info(e);
      return null;
    });
};
