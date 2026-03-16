import axios from 'axios';
import fetch from 'node-fetch'
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';


export const uploadFile = async (buffer, filename) => {
  const form = new FormData();
  form.append('files', buffer, { filename });

  const response = await axios.post('https://cdn.yupra.my.id/upload', form, {
    headers: {
      ...form.getHeaders(),
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36'
    },
    timeout: 120000
  });

  return response.data;
};

export const btch = async (buffer) => {
  let { ext } = await fileTypeFromBuffer(buffer);
  const bodyForm = new FormData();
  bodyForm.append("file", buffer, "file." + ext);

  let res = await fetch("https://file.botcahx.eu.org/api/upload.php", {
    method: "post",
    body: bodyForm,
  });

  let data = await res.json()
  return data.result.url || 'null'
}