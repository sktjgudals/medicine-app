interface OutPut {
  access: string | null;
  refresh: string | null;
}

const tokenCall = (): OutPut => {
  let access: string | null;
  let refresh: string | null;
  access = localStorage.getItem("access_token");
  refresh = localStorage.getItem("refresh_token");
  return { access, refresh };
};

const tokenSet = (access: string, refresh: string) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

const tokenDelete = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

const blurDataUrl =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=";

export { tokenCall, tokenSet, tokenDelete, blurDataUrl };
