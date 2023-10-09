const searchInput = document.getElementById('searchInput');
const videoList = document.getElementById('videoList');
let searchTimeout;
let controller;

searchInput.addEventListener('input', function () {
    clearTimeout(searchTimeout);
    if (controller) {
        controller.abort(); // Abort the previous request
    }
    searchTimeout = setTimeout(fetchData, 500); // Debounce the search
});

async function fetchData() {
    const searchVideo = searchInput.value;
    const url = `https://youtube138.p.rapidapi.com/search/?q=${searchVideo}&hl=en&gl=US`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f2a1e58d89mshf655bdea261b4dfp1d2ddfjsn6e7cb98fc31e',
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        },
    };

    controller = new AbortController(); // Create a new AbortController
    options.signal = controller.signal;

    try {
        const response = await fetch(url, options);
        const resp = await response.json();
        console.log(resp)
        const DATA = Object.values(resp.contents);

        // Clear previous search results
        videoList.innerHTML = '';

        DATA.forEach(item => {
            if (item.type === 'video') {
                const videoTitle = item.video.title;
                const videoLink = `https://www.youtube.com/watch?v=${item.video.videoId}`;
                const videoThumbnails = item.video.thumbnails[0].url;

                const videoElement = document.createElement('a');
                videoElement.href = videoLink;
                videoElement.textContent = videoTitle;
                videoElement.target = '_blank';

                const videoImg = document.createElement('img');
                videoImg.src = videoThumbnails;

                const listItem = document.createElement('div');
                listItem.classList.add('video');
                listItem.appendChild(videoElement);
                listItem.appendChild(videoImg);

                videoList.appendChild(listItem);

                // console.log(item.video);
            }
        });
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error(error);
        }
    }
}

// simple fetch request
// let searchVideo = 'jstutorial'
//
// async function fetchData() {
//     const url = `https://youtube138.p.rapidapi.com/search/?q=${searchVideo}&hl=en&gl=US`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'f2a1e58d89mshf655bdea261b4dfp1d2ddfjsn6e7cb98fc31e',
//             'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
//         }
//     };
//
//     try {
//         const response = await fetch(url, options);
//         const result = await response.text();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// }
//
// fetchData().then()


// request with button search
// const searchInput = document.getElementById('searchInput');
// const searchButton = document.getElementById('searchButton');
// const videoList = document.getElementById('videoList');
//
// async function fetchData() {
//     const searchVideo = searchInput.value;
//     const url = `https://youtube138.p.rapidapi.com/search/?q=${searchVideo}&hl=en&gl=US`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'f2a1e58d89mshf655bdea261b4dfp1d2ddfjsn6e7cb98fc31e',
//             'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
//         }
//     };
//
//     try {
//         const response = await fetch(url, options);
//         const resp = await response.json();
//         const DATA = Object.values(resp.contents)
//
//         // Clear previous search results
//         videoList.innerHTML = '';
//
//         DATA.forEach(item => {
//             if (item.type === 'video') {
//                 const videoTitle = item.video.title;
//                 const videoLink = `https://www.youtube.com/watch?v=${item.video.videoId}`;
//                 const videoThumbnails = item.video.thumbnails[0].url;
//
//                 const videoElement = document.createElement('a');
//                 videoElement.href = videoLink;
//                 videoElement.textContent = videoTitle;
//                 videoElement.target = '_blank';
//
//                 const videoImg = document.createElement('img');
//                 videoImg.src = videoThumbnails;
//
//
//                 const listItem = document.createElement('div');
//                 listItem.classList.add('video')
//                 listItem.appendChild(videoElement);
//                 listItem.appendChild(videoImg);
//
//                 videoList.appendChild(listItem);
//
//                 // console.log(item.video.title, item.video.videoId)
//                 console.log(item.video)
//             }
//         })
//     } catch (error) {
//         console.error(error);
//     }
// }
//
// searchButton.addEventListener('click', fetchData);


