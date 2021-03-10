import axios from 'axios';
import 'regenerator-runtime/runtime';

document.querySelector('.createVideo').addEventListener('click', createVideo);

async function createVideo(e) {
  e.preventDefault();
  let title = document.querySelector('.title').value;
  let auth = document.querySelector('.auth').value;
  let category = document.querySelector('.category').value;
  let tag = document.querySelector('.tag').value;
  const data = {
    title, auth, category, tag
  }
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/videos',
      data
    });
    if (res) {
      const form = new FormData();
      form.append('thumbnail', document.getElementById('image').files[0]);
      const resthumb = await axios({
        method: 'PATCH',
        url: `/api/videos/${res.data.data.id}`,
        data: form
      });
      if (resthumb) {
        const formVideo = new FormData();
        formVideo.append('video', document.getElementById('video').files[0]);
        const upload = await axios({
          method: 'POST',
          url: `/api/videos/upload/${resthumb.data.data}`,
          data: formVideo
        });
        if (upload) {
          document.querySelector('.uploadMessage').classList.add('success');
          document.querySelector('.uploadMessage').innerHTML = 'لقد تم تحميل الفيديو';
          setTimeout(() => {
            document.querySelector('.uploadMessage').classList.remove('success');
            document.querySelector('.uploadMessage').innerHTML = '';
          }, 10000);
        }
      }
    }
  } catch (er) {
    document.querySelector('.uploadMessage').classList.add('arror');
    document.querySelector('.uploadMessage').innerHTML = 'لم يتم تحميل الفيديو';
    setTimeout(() => {
      document.querySelector('.uploadMessage').classList.remove('arror');
      document.querySelector('.uploadMessage').innerHTML = '';
    }, 10000);
  }
}