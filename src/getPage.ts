import axios from "axios";

function getPage(pageUrl: string): Promise<any> {
  return new Promise(function (resolve, reject) {
    axios
      .get(pageUrl)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (response) {
        reject(response);
      });
  });
}

export default getPage;
