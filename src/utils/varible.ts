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

export { tokenCall, tokenSet };
