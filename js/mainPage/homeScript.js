export function initializePage() {
  console.log('✅ 홈 페이지 초기화 실행됨!');
}
document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.letter-img').forEach((img) => {
    let speed = img.dataset.speed; // HTML에서 data-speed 값을 가져옴

    gsap.to(img, {
      y: -window.innerHeight * speed, // 스크롤 시 이미지가 위로 이동하는 정도 조절
      ease: 'power1.out',
      scrollTrigger: {
        trigger: '.section01',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
});
