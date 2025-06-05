import NewImage1 from "../assets/images/initialNews/news1.webp"; // Thay bằng ảnh thực tế
import NewImage2 from "../assets/images/initialNews/news2.webp"; // Thay bằng ảnh thực tế
// const initialNews = [
//     {
//         image: NewImage1, // Thay bằng URL ảnh thực tế
//         title: "Tin tức 1",
//         description: "Đây là nội dung tóm tắt của tin tức số 1.",
//         date: "2025-05-23"
//     },
//     {
//         image: NewImage2, // Thay bằng URL ảnh thực tế
//         title: "Tin tức 2",
//         description: "Đây là nội dung tóm tắt của tin tức số 2.",
//         date: "2025-05-22"
//     },
//     {
//         image: NewImage1, // Thay bằng URL ảnh thực tế
//         title: "Tin tức 3",
//         description: "Đây là nội dung tóm tắt của tin tức số 3.",
//         date: "2025-05-21"
//     },
// ];

const initialNews = Array.from({ length: 20 }, (_, i) => ({
    image: i % 2 === 0 ? NewImage1 : NewImage2,
    title: `Tin tức ${i + 1}`,
    description: `Đây là nội dung tóm tắt của tin tức số ${i + 1}.`,
    date: `2025-05-${(23 - (i % 10)).toString().padStart(2, '0')}`
}));

export default initialNews;