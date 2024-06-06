import {getTelegramApi} from "./telegram";

const env = process.env.NODE_ENV;
let api = "/api/";
if(env === "development") {
  api = "http://localhost:3100/api/"
}

export const getImageApi = () =>  {
  let api = "/images/";
  if(env === "development") {
    api = "http://localhost:3100/images/"
  }
  return api;
};

const getToken = () => {
  return getTelegramApi().initData;
}

const readAnswer = async (response) => {
  if (response.ok) {
    const body = await response.text();
    if(body.length > 0)
    {
      return JSON.parse(body);
    } else {
      return null;
    }
  } else {
    console.error("Ошибка HTTP: " + response.status);
  }
}

export const get = async (path) => {
  const url = api + path;
  try {
    let response = await fetch(url, {
      headers: {
        token: getToken()
      }
    });
    return await readAnswer(response);
  } catch (e) {
    console.error("GET " + url + "error");
  }
}

export const post = async (path, body) => {
  const url = api + path;
  try {
    const request = {
      method: 'POST',
      headers: {
        token: getToken(),
        'Content-Type': 'application/json;charset=utf-8'
      }
    }

    if(body)
    {
      request.body = JSON.stringify(body);
    }

    let response = await fetch(url, request);

    return await readAnswer(response);
  } catch (e) {
    console.error(`POST ${url} ${JSON.stringify(body)} error`);
  }
}
