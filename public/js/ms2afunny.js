import axios from 'axios';
import 'regenerator-runtime/runtime';
window.isMobile = false;
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
}
const video = document.getElementById('video__viewer');
if (video) video.preload = "auto";
var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
const sVideo = document.querySelector('.video');
let header__nav;
if (document.querySelector('.header__nav')) {
    header__nav = document.querySelector('.header__nav').getBoundingClientRect().height;
}
const videoPlayerLandSC = document.querySelector('.video__player-landSC');
const menuBar = document.querySelector('.navigation__rt');
const menu = document.querySelector('.navigation__menuBar .navigation__account');
const menuCat = document.querySelector('.navigation__menuBar-cat');
const menuCatLink = document.querySelector('.navigation__menuBar-cat .navigation__link');
const menuCatUl = document.querySelector('.navigation__menuBar-cat .navigation__items');
const navigation__categories = document.querySelector('.navigation__categories-title');
const navigation__items = document.querySelector('.navigation__items');


const videoResolutionI = document.querySelector('.video__resolutionI');
let i = localStorage.getItem('ms2afunny');
const v = document.getElementById('video');
const playIcon = document.querySelector('.video__playSVG');
const vCT = document.querySelector('.video__length-current');
const vLength = document.querySelector('.video__length-length');
const volumeSlider = document.querySelector('.video__volume--slider');
const volumeProgress = document.querySelector('.video__volume--progress');
const volumeIcon = document.querySelector('.video__volume--icon');
const videoContols = document.querySelector('.video__contols');
const videoPlayC = document.querySelector('.video__playC');
const skipR = document.querySelector('.video__skipping-right');
const skipL = document.querySelector('.video__skipping-left');
const fI = document.querySelector('.video__fullS');
const vReso = document.querySelector('.video__resolution');
const videoSeking = document.querySelector('.video__seking');
const showComments = document.querySelector('.video__comments-show');
let volumeTrue = false;
let blury = true;
let x = false;

(() => {
    try {
        if (!document.querySelector(".main ")) return;
        class Carousel {
            constructor(parentDiv, setting) {
                this.parentDiv = parentDiv;
                this.setting = Object.assign({}, {
                    slidesVisible: 1,
                    moveAmount: 1,
                    dotts: true,
                    contentAnimation: true,
                    responsive: [
                        { breakPoint: 500, slidesVisible: 1, moveAmount: 1 },
                        { breakPoint: 800, slidesVisible: 2, moveAmount: 1 },
                        { breakPoint: 1000, slidesVisible: 3, moveAmount: 1 },
                    ]
                }, setting);
                this.current = 0;
                this.mylist = this.createElements("ul", "carousel__dotts");
                this.mydotts = [];
                this.build();
                this.size = 100 / this.carousel__items.length;
                this.drag_drop();
            }
            build() {
                this.carousel = this.createElements('div', 'carousel');
                this.container = this.createElements('div', 'carousel__container');
                this.carousel.append(this.container);
                this.carousel__items = [...this.parentDiv.children].map(slider => {
                    let item = this.createElements('div', 'carousel__child');
                    item.append(slider);
                    this.container.append(item);
                    return item
                });
                this.parentDiv.append(this.carousel);
                this.setWidths();
                if (this.setting.arrow) {
                    this.buttons();
                }
                if (this.setting.dotts) {
                    this.dotts();
                    this.dottActive(0);
                }
                window.addEventListener('resize', this.onResize.bind(this));
                this.toggleClass(0);
            }
            onResize() {
                this.setWidths()
                if (this.setting.dotts) {
                    this.dotts();
                    this.dottActive(0);
                }
                this.move(this.current);
            }
            getSetting() {
                let res = this.setting.responsive.sort((a, b) => a.breakPoint - b.breakPoint).find((point) => window.innerWidth <= point.breakPoint)
                return res ? res : this.setting;
            }
            createElements(element, clas) {
                let a = document.createElement(element);
                a.setAttribute('class', clas);
                return a;
            }
            setWidths() {
                this.container.style.width = `${(this.carousel__items.length / this.getSetting().slidesVisible) * 100}%`;
                for (let e of this.carousel__items) {
                    e.style.width = `${100 / this.carousel__items.length}%`
                }
            }
            buttons() {
                this.leftButton = this.createElements('button', 'carousel__btn carousel__btn--prev');
                this.leftButton.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g mirror-in-rtl="" >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </g></svg>`;
                this.leftButton.setAttribute('aria-pressed', 'false');
                this.RightButton = this.createElements('button', 'carousel__btn carousel__btn--next');
                this.RightButton.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g mirror-in-rtl="" >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </g></svg>`;
                this.RightButton.setAttribute('aria-pressed', 'false');
                let carouselControls = this.createElements('div', 'carousel__controls')
                carouselControls.append(this.leftButton);
                carouselControls.append(this.RightButton);
                this.parentDiv.append(carouselControls);
                this.leftButton.addEventListener('click', this.prevSlid.bind(this));
                this.RightButton.addEventListener('click', this.nextSlid.bind(this));
            }
            nextSlid() {
                this.move(this.current + this.getSetting().moveAmount, this.setting.arrowTran);
            }
            prevSlid() {
                this.move(this.current - this.getSetting().moveAmount, this.setting.arrowTran);
            }
            move(index, trans) {
                if (index < 0) {
                    if (this.current == 0) {
                        this.container.style.transition = '1s';
                        index = (this.carousel__items.length - this.getSetting().slidesVisible);
                    } else {
                        this.container.style.transition = '1s';
                        index = 0;
                    }
                }
                else if (index > this.carousel__items.length - this.getSetting().slidesVisible && this.current >= this.carousel__items.length - this.getSetting().slidesVisible) {
                    this.container.style.transition = '1s';
                    index = 0;
                }
                index = this.transX(this.size * index) || index;
                this.container.style.transition = '1s';
                if (!trans) {
                    this.container.style.transition = '1s';
                }
                this.container.style.transform = `translateX(${-this.size * index}%)`;
                setTimeout(() => {
                    this.container.style.transition = '';
                })
                this.current = index;
                if (this.setting.dotts) this.dottActive(index);
                this.toggleClass(index);
            }
            transX(x) {
                if (x >= (this.container.clientWidth - this.carousel.clientWidth) * 100 / this.container.clientWidth) {
                    return this.carousel__items.length - this.getSetting().slidesVisible;
                }
                return null;
            }
            dotts() {
                this.mylist.innerHTML = "";
                let x = Math.ceil((this.carousel__items.length - this.getSetting().slidesVisible) / this.getSetting().moveAmount);
                for (let i = 0; i <= x; i++) {
                    let myli = this.createElements("li", "carousel__list");
                    this.mylist.append(myli);
                    myli.addEventListener("click", () => {
                        this.move(i * this.getSetting().moveAmount, this.setting.arrowTran);
                    });
                }
                this.parentDiv.append(this.mylist);
                this.mydotts = [...this.mylist.children];
            }
            dottActive(index) {
                let active_dot = this.mydotts[Math.ceil(index / this.getSetting().moveAmount)]
                this.mydotts.forEach(i => i.classList.remove("carousel__list--active"));
                active_dot.classList.add("carousel__list--active");
            }
            toggleClass(index) {

                try {
                    if (!this.setting.contentAnimation || this.getSetting().slidesVisible > 1 || this.scrolAnim) {
                        return;
                    }
                    this.carousel__items.forEach(item => { item.classList.remove('active'); });
                    this.carousel__items.forEach(item => item.querySelector('.container').classList.remove('active'));
                    for (let i = index; i < this.getSetting().slidesVisible + index; i++) {
                        this.carousel__items[i].classList.add('active');
                        this.carousel__items[i].querySelector('.container').classList.add('active');
                    }
                } catch (er) {
                    return;
                }

            }
            drag_drop() {
                this.container.addEventListener("mousedown", this.onstart.bind(this))

                window.addEventListener("mousemove", this.onmove.bind(this))

                window.addEventListener("mouseup", this.onend.bind(this))

                this.container.addEventListener("touchstart", this.onstart.bind(this))

                window.addEventListener("touchmove", this.onmove.bind(this))

                window.addEventListener("touchend", this.onend.bind(this))
                this.container.addEventListener("dragstart", e => e.preventDefault())
            }
            onstart(e) {
                if (e.touches) {
                    if (e.touches.length > 1) return;
                    e = e.touches[0];
                }
                this.startx = e.screenX;
            }
            onmove(e) {
                if (this.startx) {
                    let tranEnd = -(this.current * 100 / this.carousel__items.length) + (this.a * 100 / this.container.clientWidth);
                    if (this.getSetting().slidesVisible === this.carousel__items.length) return;
                    this.scrolAnim = true;
                    this.toggleClass(this.current);
                    let event = e.touches ? e.touches[0] : e;
                    this.a = event.screenX - this.startx;
                    this.container.style.transition = "none";
                    if (tranEnd >= 10) tranEnd = 10;
                    else if (tranEnd <= -(this.carousel__items.length - this.getSetting().slidesVisible) * this.size - 10) tranEnd = -(this.carousel__items.length - this.getSetting().slidesVisible) * this.size - 10;
                    this.container.style.transform = `translateX(${tranEnd}%)`;
                }
            }
            onend() {
                if (this.startx) {
                    setTimeout(() => { this.container.style.transition = "1s"; });
                    this.scrolAnim = false;
                    this.toggleClass(this.current);
                    if (Math.abs(this.a) * 100 / this.carousel.clientWidth > 10) {
                        if (this.a > 0) {
                            if ((-this.current * 100 / this.carousel__items.length + this.a * 100 / this.container.clientWidth) >= 0) {
                                this.move(0);
                            }
                            else {
                                this.move(Math.floor(Math.abs(-this.current * 100 / this.carousel__items.length + this.a * 100 / this.container.clientWidth) / (100 / this.carousel__items.length)), this.getSetting().slidesVisible != 1);
                            }
                        }
                        else {
                            if (this.current == this.carousel__items.length - this.getSetting().slidesVisible) {
                                this.move(this.current);

                            } else {
                                this.move(Math.ceil(Math.abs(-this.current * 100 / this.carousel__items.length + this.a * 100 / this.container.clientWidth) / (100 / this.carousel__items.length)), this.getSetting().slidesVisible != 1);
                            }
                        }
                    }
                    else {
                        this.move(this.current, this.getSetting().slidesVisible !== 1);
                    }
                    this.a = null;
                    this.startx = null;
                }
            }
        }
        document.querySelectorAll(".carousel__videos").forEach(carousel => {
            new Carousel(carousel, {
                slidesVisible: 4,
                moveAmount: 1,
                arrow: 1,
                dotts: 0,
                contentAnimation: 0,
                arrowTran: 0
            });
        });
    } catch (er) {
        return;
    }
})();
//droplist
(() => {
    try {
        if (!navigation__categories) return;
        navigation__categories.addEventListener('click', dropList);
        function dropList() {
            navigation__items.classList.toggle('active');
            return;
        }
        window.addEventListener('click', (e) => {
            if (!e.target.classList.contains('navigation__categories-title')) {
                navigation__items.classList.remove('active');
            }
        })
    } catch (er) {
        console.log(er);
    }
})();

(() => {
    try {
        if (!sVideo) return;
        function setHeight() {
            header__nav = document.querySelector('.header__nav').getBoundingClientRect().height;
            sVideo.style.paddingTop = `${header__nav}px`;
            if (window.screen.width <= 767) {
                if (orientation === "portrait-primary") {
                    videoPlayerLandSC.classList.add('stickyV');
                    videoPlayerLandSC.style.top = `${header__nav}px`;
                    videoPlayerLandSC.style.height = 'inherit';
                }
            }
            return;
        }
        window.addEventListener('resize', setHeight);
        setHeight();


    } catch (er) {
        return;
    }
})();

(() => {
    if (!menuBar) return;
    menuBar.addEventListener('click', toggleMenu);
    menuCatLink.addEventListener('click', toggleCat);
    function toggleMenu() {
        menu.classList.toggle('active');
        document.body.classList.toggle('overflow');
        return;
    }
    function toggleCat() {
        menuCatUl.classList.toggle('active');
        menuCatLink.classList.toggle('active');
        menuCat.classList.toggle('active');
        return;
    }
})();

//ms2a video player
(() => {
    try {
        if (!v) return;
        videoResolutionI.addEventListener('click', (e) => {
            e.preventDefault();
            vReso.classList.toggle('active');
        });
        [...document.querySelectorAll('input')].forEach(input => {
            input.addEventListener('focus', () => {
                blury = false;
            });
            input.addEventListener('blur', () => {
                blury = true;
            });
        });
        function handleVolume(e) {
            if (volumeSlider.offsetWidth <= e.offsetX) return;
            if (e.pageX - volumeSlider.getBoundingClientRect().left <= 0) {
                volumeIcon.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z"></path></svg>'
                volumeProgress.style.width = '0%';
                return;
            }
            else {
                volumeIcon.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><defs><clipPath><path d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"></path><path d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"></path><path d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z" transform="translate(0, 0)"></path></clipPath><clipPath ><path d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z" transform="translate(0, 0)"></path></clipPath></defs><path  d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z" fill="#fff" ></path><path d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z" fill="#fff" style="display: none;"></path></svg>'
                volumeProgress.style.width = e.offsetX + 'px';
                let value = e.offsetX / 100;
                if (value >= 1) {
                    value = 1;
                    video['volume'] = value;
                } else {
                    video['volume'] = e.offsetX / 100;
                }
            }
        }
        //handleProgress
        function videoRealTime() {
            const percent = (video.currentTime / video.duration) * 100;
            document.querySelector('.video__progress--filled').style.width = percent + '%';
            videoTimer();
        }
        function videoProgress() {
            let playaa = true;
            if (video.paused) {
                playaa = false;
            }
            if (video.seeking) {
                videoSeking.style.display = 'block';
            } else {
                videoSeking.style.display = 'none';
                if (playaa) video.play();
            }
            if (video.readyState === 4) {
                var loadedPercentage = (this.buffered.end(0) / this.duration) * 100;
                document.querySelector('.video__progress--p').style.width = loadedPercentage + '%';
            }
        }
        function videoTimer() {
            var ds = parseInt(video.duration % 60);
            var dm = parseInt((video.duration / 60) % 60);
            var s = parseInt(video.currentTime % 60);
            var m = parseInt((video.currentTime / 60) % 60);
            if (String(s).length == 1) s = `0${s}`;
            if (String(ds).length == 1) ds = `0${ds}`;
            if (isNaN(ds) || isNaN(dm)) {
                vLength.textContent = `0:00`;
                vCT.textContent = `0:00`;
            } else {
                vLength.textContent = `${dm}:${ds}`;
            }
            vCT.textContent = `${m}:${s}`;
        }
        videoTimer();
        function togglePlayButton() {
            const icon = this.paused
                ? '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z" ></path></svg>'
                : '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z" ></path></svg>';
            playIcon.innerHTML = icon;
        }
        function ms2aPlayer(e) {
            if (window.screen.width <= 767) {
                if (e.target.classList.contains('video__play')) {
                    e.preventDefault();
                    const method = video.paused ? 'play' : 'pause';
                    video[method]();
                }
                return;
            }
            if (e.target.classList.contains('video__play') ||
                e.target.classList.contains('video__player') ||
                e.target.classList.contains('video__viewer') ||
                e.keyCode === 32 && blury) {
                e.preventDefault();
                const method = video.paused ? 'play' : 'pause';
                video[method]();
                return;
            }
            if (e.keyCode === 39) {
                skipR.click();
                return;
            } else if (e.keyCode === 37) {
                skipL.click();
                return;
            }
        }
        function skip() {
            video.currentTime += parseFloat(this.dataset.skip);
        }
        function videoResolution(e) {
            if (!e.target.classList.contains('active')) {
                document.querySelector('.video__resolution__r.active').classList.remove('active');
                e.target.classList.add('active');
                const resolution = e.target.dataset.r;
                let v = window.location.pathname.split('/');
                v = v[v.length - 1];
                video.pause();
                setTimeout(() => {
                    document.getElementById('video__viewer').src = `/api/v1/videos/video/${v}${resolution}`;
                }, 0);
            }
            return;
        }
        function fullScreen(e) {
            if (fI.classList.contains('fullS')) {
                fI.classList.toggle('fullS');
                fI.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><g><path  d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z" ></path></g><g><path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z" ></path></g><g><path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z" ></path></g><g ><path  d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z" ></path></g></svg>'
                const cancellFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
                if (window.screen.width <= 767 && screen.orientation) {
                    videoPlayerLandSC.classList.add('stickyV');
                    videoPlayerLandSC.style.top = `${header__nav}px`;
                    videoPlayerLandSC.style.height = 'inherit';
                    videoPlayerLandSC.style.position = 'fixed';
                    screen.orientation.lock("portrait-primary");
                }
                cancellFullScreen.call(document);
            } else {
                fI.classList.toggle('fullS');
                fI.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><g><path  d="m 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z"></path></g><g ><path d="m 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z"></path></g><g ><path d="m 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z" ></path></g><g>></use><path d="m 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z"></path></g></svg>'
                const requestFullScreen = v.requestFullscreen || v.webkitRequestFullScreen || v.mozRequestFullScreen || v.msRequestFullScreen;
                requestFullScreen.call(v);
                if (window.screen.width <= 767) {
                    videoPlayerLandSC.classList.remove('stickyV');
                    videoPlayerLandSC.style.top = `0`;
                    videoPlayerLandSC.style.height = '100%';
                    videoPlayerLandSC.style.position = 'initial';
                    if (orientation === "landscape-primary") {
                        return;
                    } else {
                        screen.orientation.lock("landscape-primary");
                    }
                }

            }
        }
        function toggleVolume() {
            playIcon.classList.toggle('mute');
            if (playIcon.classList.contains('mute')) {
                video.volume = 0;
                volumeProgress.style.width = '0%';
                volumeIcon.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z"></path></svg>'
            } else {
                volumeIcon.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><defs><clipPath><path d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"></path><path d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"></path><path d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z" transform="translate(0, 0)"></path></clipPath><clipPath ><path d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z" transform="translate(0, 0)"></path></clipPath></defs><path  d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z" fill="#fff" ></path><path d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z" fill="#fff" style="display: none;"></path></svg>'
                video.volume = 0.5;
                volumeProgress.style.width = '50%';
            }
        }
        function scrub(e) {
            e.preventDefault();
            if (e.touches) {
                let touchE = e.touches[0];
                let scrubTime = (touchE.clientX / document.querySelector('.video__progress').offsetWidth) * video.duration;
                video.currentTime = scrubTime;
                document.querySelector('.video__progress--filled').style.width = touchE.clientX + 'px';
                return;
            }
            let scrubTime = (e.offsetX / document.querySelector('.video__progress').offsetWidth) * video.duration;
            video.currentTime = scrubTime;
            document.querySelector('.video__progress--filled').style.width = e.offsetX + 'px';
            return;
        }
        // async function postComment() {
        //     const commentsContainer = document.querySelector('.video__comments-container');
        //     const dAlert = document.querySelector('.alertEr');
        //     const comment = String(document.querySelector('.video__comments-input input').value);
        //     if (!commentsContainer || !dAlert) return;
        //     try {
        //         if (comment.length < 2) {
        //             dAlert.innerHTML = 'أكتب تعليق...';
        //             dAlert.classList.add('active');
        //             return;
        //         }
        //         if (!i) {
        //             window.open("/ms2a", '_self');
        //         }
        //         dAlert.classList.remove('active');
        //         const res = await axios({
        //             method: "POST",
        //             url: '/api/v1/videos/video/comment',
        //             data: { comment },
        //             withCredentials: true
        //         });
        //         if (res.data.status == 'success') {
        //             const comment = document.createElement('div');
        //             comment.classList.add('video__comment-placeHolder');
        //             comment.innerHTML = `
        //             <div class="video__comment-flexy"><div class="video__user-image video__user"><img class="video__user-image" src='/api/v1/videos/image/${res.data.user.photo}'>
        //             </div><div class="video__user-info"><h4 class="video__user-name"> ${res.data.user.name} <span class="video__user-published-time">${new Date(res.data.comment.dateOfCreation).toLocaleDateString()}</span>
        //             </h4><p class="video__user-comment">${res.data.comment.comment}</p></div></div><div class="video__user-statis"><div class="video__block">
        //             <div class="video__info"><div class="video__info-hor video__like-dislike"><div class="video__container">
        //             <button class="video__button video__like" data-comment='${res.data.comment.id}'><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></svg></button>
        //             <span class="video__span video__likes"></span></div><div class="video__container">
        //             <button class="video__button video__dislike" data-comment='${res.data.comment.id}'>
        //             <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></svg></button>
        //             <span class="video__span video__dislikes"></span></div></div></div></div></div>`;
        //             commentsContainer.insertAdjacentElement('afterbegin', comment);
        //             let nbrOfC = +document.querySelector('.video__comments-info--inc').textContent + 1;
        //             document.querySelector('.video__comments-info--inc').textContent = nbrOfC;
        //             document.querySelector('.video__comments-input input').value = '';
        //             return;
        //         } else {
        //             dAlert.innerHTML = 'المرجو تسجيل الدخول';
        //             dAlert.classList.add('active');
        //         }
        //     } catch (er) {
        //         dAlert.innerHTML = 'المرجو تسجيل الدخول';
        //         dAlert.classList.add('active');
        //         return;
        //     }
        // }
        async function updateComment(e) {
            try {
                e.preventDefault();
                let href = window.location.href;
                sessionStorage.setItem('content', href);
                const commentId = e.target.dataset.comment;
                let data = {};
                if (e.target.classList.contains('video__like')) {
                    if (!i) return window.open("/ms2a?new=true", "_self");
                    if (e.target.classList.contains('active')) {
                        data = Object.assign({ commentId }, { type: 'like' }, { c: 'deleteLike' });
                        e.target.classList.remove('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/comment',
                            data,
                            withCredentials: true
                        });
                        return;
                    } else {
                        let Btn = document.querySelector(`[data-comment="${commentId}"].video__dislike`);
                        data = Object.assign({ commentId }, { type: 'like' }, { c: 'addLike' });
                        e.target.classList.add('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;
                        if (Btn.classList.contains('active')) {
                            Btn.classList.remove('active');
                            Btn.nextElementSibling.textContent = +Btn.nextElementSibling.textContent - 1;
                            data = Object.assign({ commentId }, { type: 'like' }, { c: 'addLike' }, { i: 'deleteDislike' });
                        }
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/comment',
                            data,
                            withCredentials: true
                        });
                        return;
                    }
                }
                if (e.target.classList.contains('video__dislike')) {
                    if (!i) return window.open("/ms2a?new=true", "_self");
                    if (e.target.classList.contains('active')) {
                        data = Object.assign({ commentId }, { type: 'dislike' }, { c: 'deleteDislike' });
                        e.target.classList.remove('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/comment',
                            data,
                            withCredentials: true
                        });
                        return;
                    } else {
                        let Btn = document.querySelector(`[data-comment="${commentId}"].video__like`);
                        data = Object.assign({ commentId }, { type: 'dislike' }, { c: 'addDislike' });
                        e.target.classList.add('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;
                        if (Btn.classList.contains('active')) {
                            Btn.classList.remove('active');
                            Btn.nextElementSibling.textContent = +Btn.nextElementSibling.textContent - 1;
                            data = Object.assign({ commentId }, { type: 'dislike' }, { c: 'addDislike' }, { i: 'deleteLike' });
                        }
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/comment',
                            data,
                            withCredentials: true
                        });
                        return;
                    }
                }
            } catch (er) {
                return;
            }
        }
        async function updateV(e) {
            try {
                e.preventDefault();
                let href = window.location.href;
                sessionStorage.setItem('content', href);
                let data = {};
                if (e.target.classList.contains('video__like')) {
                    if (!i) return window.open("/ms2a?new=true", "_self");
                    if (e.target.classList.contains('active')) {
                        data = Object.assign({ type: 'like' }, { c: 'deleteLike' });
                        e.target.classList.remove('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/updatems2a',
                            data,
                            withCredentials: true
                        });
                        return;
                    } else {
                        let Btn = document.querySelector(`.video__info .video__dislike`);
                        data = Object.assign({ type: 'like' }, { c: 'addLike' });
                        e.target.classList.add('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;
                        if (Btn.classList.contains('active')) {
                            Btn.classList.remove('active');
                            Btn.nextElementSibling.textContent = +Btn.nextElementSibling.textContent - 1;
                            data = Object.assign({ type: 'like' }, { c: 'addLike' }, { i: 'deleteDislike' });
                        }
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/updatems2a',
                            data,
                            withCredentials: true
                        });
                        return;
                    }
                }
                if (e.target.classList.contains('video__dislike')) {
                    if (!i) return window.open("/ms2a?new=true", "_self");
                    if (e.target.classList.contains('active')) {
                        data = Object.assign({ type: 'dislike' }, { c: 'deleteDislike' });
                        e.target.classList.remove('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/updatems2a',
                            data,
                            withCredentials: true
                        });
                        return;
                    } else {
                        let Btn = document.querySelector(`.video__info .video__like`);
                        data = Object.assign({ type: 'dislike' }, { c: 'addDislike' });
                        e.target.classList.add('active');
                        e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;
                        if (Btn.classList.contains('active')) {
                            Btn.classList.remove('active');
                            Btn.nextElementSibling.textContent = +Btn.nextElementSibling.textContent - 1;
                            data = Object.assign({ type: 'dislike' }, { c: 'addDislike' }, { i: 'deleteLike' });
                        }
                        await axios({
                            method: "PATCH",
                            url: '/api/v1/videos/video/updatems2a',
                            data,
                            withCredentials: true
                        });
                        return;
                    }
                }
            } catch (er) {
                return;
            }
        }
        function showCommentsP() {
            document.querySelector('.video__comments').classList.add('active');
            document.querySelector('.ms2aFooter').style.display = 'none';
            document.querySelector('.video__left').style.display = 'none';
        }
        function hidCommentsP() {
            document.querySelector('.video__comments').classList.remove('active');
            document.querySelector('.ms2aFooter').style.display = 'block';
            document.querySelector('.video__left').style.display = 'block';
        }
        function shareV(e) {
            if (e.target.classList.contains('s')) {
                document.querySelector('.video__share-placeholder').style.display = 'none';
                return;
            }
            if (e.target.classList.contains('video__share-placeholder')) {
                e.target.style.display = 'none';
            }
            let href = window.location.href;
            let image = `https://${window.location.host}/api/v1/videos/image/${window.location.pathname.split('/')[2]}`;
            let fLink = `https://www.facebook.com/sharer/sharer.php?u=${href}&picture=${image}`;
            let tLink = `http://twitter.com/intent/tweet?url=${href}`;
            if (e.target.classList.contains('video__share__f')) {
                window.open(fLink);
                return;
            }
            if (e.target.classList.contains('video__share__t')) {
                window.open(tLink);
                return;
            }
            if (e.target.nodeName == "INPUT") {
                var copyText = document.getElementById("shareLink");
                copyText.select();
                copyText.setSelectionRange(0, 99999)
                document.execCommand("copy");
                document.querySelector('.video__share__lP').style.display = 'block';
                setTimeout(() => {
                    document.querySelector('.video__share__lP').style.display = 'none';
                }, 1500);
                return;
            }

        }
        let nextVtoggle = false;
        const nextVB = document.querySelector('.video__auto-play .video__checkbox');
        nextVB.addEventListener('click', function () {
            this.classList.toggle('active');
            if (this.classList.contains('active')) return nextVtoggle = true;
            nextVtoggle = false;
        });
        document.querySelector('.video__share-placeholder').addEventListener('click', shareV);
        document.querySelector('.video__share').addEventListener('click', () => {
            document.querySelector('.video__share-placeholder').style.display = 'block';
        });
        if (!isMobile) {
            showComments.style.display = 'none';
            document.querySelector('.video__comments-infoP .video__L').style.display = 'none';
        }
        window.addEventListener('DOMContentLoaded', () => {
            showComments.addEventListener('click', showCommentsP);
            document.querySelector('.video__comments-infoP .video__L').addEventListener('click', hidCommentsP);
        });
        //document.querySelector('.video__comments-post').addEventListener('click', postComment);
        //document.querySelector('.video__comments-input input').addEventListener('keydown', (e) => e.keyCode == 13 && postComment(e));
        document.querySelector('.video__comments-container').addEventListener('click', updateComment);
        //document.querySelector('.video__info').addEventListener('click', updateV);
        document.querySelector('.video__progress').addEventListener('click', scrub);
        document.querySelector('.video__progress').addEventListener('mousemove', (e) => x && scrub(e));
        document.querySelector('.video__progress').addEventListener('mousedown', () => x = true);
        window.addEventListener('mouseup', () => x = false);
        document.querySelector('.video__progress').addEventListener('touchstart', scrub);
        document.querySelector('.video__progress').addEventListener('touchstart', () => x = true);
        document.querySelector('.video__progress').addEventListener('touchmove', (e) => x && scrub(e));
        window.addEventListener('touchend', () => x = false);
        video.addEventListener('timeupdate', videoRealTime);
        video.addEventListener('progress', videoProgress);
        video.addEventListener('play', togglePlayButton);
        video.addEventListener('pause', togglePlayButton);
        video.addEventListener('ended', () => {
            if (nextVtoggle) {
                document.querySelector('#nextVideoC a').click();
            }
        });
        window.addEventListener('keydown', ms2aPlayer);
        v.querySelectorAll('[data-skip]').forEach(btn => {
            btn.addEventListener('click', skip);
        });
        document.querySelector('.video__volume--slider').addEventListener('click', handleVolume);
        volumeIcon.addEventListener('click', toggleVolume);
        v.addEventListener('click', ms2aPlayer);
        function doThis() {
            videoContols.style.transform = 'scaleY(1)';
            videoPlayC.style.transform = 'translate(-50%,-50%) scale(2)';
        }
        v.addEventListener('mousemove', doThis);
        v.addEventListener('dblclick', fullScreen);
        volumeSlider.addEventListener('mousedown', () => volumeTrue = true);
        volumeSlider.addEventListener('mousemove', (e) => volumeTrue && handleVolume(e));
        window.addEventListener('mouseup', () => volumeTrue = false);
        document.querySelector('.video__fullS').addEventListener('click', fullScreen);
        document.querySelectorAll('.video__resolution__r').forEach(r => r.addEventListener('click', videoResolution));
        setInterval(() => {
            if (!video.paused) {
                videoContols.style.transform = 'scaleY(0)';
                videoPlayC.style.transform = 'scaleY(0)';
            } else {
                videoContols.style.transform = 'scaleY(1)';
                videoPlayC.style.transform = 'translate(-50%,-50%) scale(2)';
            }
        }, 4000);
    } catch (er) {
        console.log(er);
        return;
    }
})();

//login
(() => {
    const login = document.getElementById('ms2a__login');
    if (!login) return;
    const loginEmail = document.getElementById('emailL');
    const loginPassword = document.getElementById('passwordL');
    const alertMsg = document.getElementById('login__msg');
    login.addEventListener('click', async (e) => {
        e.preventDefault();
        let data = {
            email: loginEmail.value,
            password: loginPassword.value
        };
        try {
            const res = await axios({
                method: "POST",
                url: "/api/user/login",
                data
            });
            if (res.data.token) {
                return window.location.reload()
            }
        } catch (er) {
            alertMsg.innerHTML = "المعلومات غير صحيحة"
        }

    });
})();

//signup
(() => {
    const signup = document.getElementById('ms2a__signup');
    if (!signup) return;
    const emailS = document.getElementById('email');
    const nameS = document.getElementById('username');
    const passwordS = document.getElementById('password');
    const passwordConfirmS = document.getElementById('confirmpassword');
    const alertMsg = document.getElementById('signup__msg');
    signup.addEventListener('click', async (e) => {
        e.preventDefault();
        let data = {
            name: nameS.value,
            email: emailS.value,
            password: passwordS.value,
            passwordConfirm: passwordConfirmS.value
        };
        try {
            const res = await axios({
                method: "POST",
                url: "/api/user/signup",
                data
            });
            if (res.data.token) {
                return window.location.reload()
            }
        } catch (er) {
            alertMsg.innerHTML = "المعلومات غير صحيحة"
        }
    });
})();

//reset password 1
(() => {
    const resetPassword = document.getElementById('resetPassword');
    if (!resetPassword) return;
    resetPassword.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        try {
            const res = await axios({
                method: "POST",
                url: "/api/user/forgotPassword",
                data: { email }
            });
            if (res.data.status == 200) {
                document.getElementById('signup__msg').textContent = 'المرجو تفقد بريدك الالكتروني';
                document.getElementById('signup__msg').classList.add('success');
            }
        } catch (er) {
            document.getElementById('signup__msg').textContent = 'حدث خطأ';
            document.getElementById('signup__msg').classList.remove('success');
        }
    });
})();

//reset password 2
(() => {
    const ms2a__resetPassword = document.getElementById('ms2a__resetPassword');
    if (!ms2a__resetPassword) return;
    ms2a__resetPassword.addEventListener('click', async (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        try {
            const res = await axios({
                method: "POST",
                url: `/api/user/resetPassword/${window.location.pathname.split('/')[2]}`,
                data: { password, passwordConfirm }
            });
            if (res.data.status == 200) {
                document.getElementById('signup__msg').textContent = 'تم تغيير كلمة السر';
                document.getElementById('signup__msg').classList.add('success');
                setTimeout(() => {
                    window.open('/', '_self');
                }, 1000);
            }
        } catch (er) {
            document.getElementById('signup__msg').textContent = 'حدث خطأ';
            document.getElementById('signup__msg').classList.remove('success');
            console.log(er.response);
        }
    })
})();

//moreVideos
(() => {
    try {
        const moreVideos = document.getElementById('moreVideos');
        if (!moreVideos) return;
        moreVideos.addEventListener('click', getMoreVideos);

        async function getMoreVideos(e) {
            e.preventDefault();
            let page = moreVideos.dataset.edi;
            let videosT = document.createElement('ul');
            videosT.classList.add('videos__content');
            let res = await axios({
                method: "GET",
                url: `/api/videos/more?page=${page}`
            });
            if (res.data.status == 'done') {
                moreVideos.style.display = 'none';
                return;
            }
            moreVideos.dataset.edi = +page + 1;
            videosT.innerHTML = res.data;
            document.querySelector('.videocontent__conteainer').insertAdjacentElement('beforeend', videosT);
        }
    } catch (er) {
        console.log(er.response);
        return;
    }
})();

//likes and dislikes
(() => {
    const likeBtn = document.querySelector('.video__like');
    if (!likeBtn) return;
    const disLikeBtn = document.querySelector('.video__dislike');

    const likeBtnComment = document.querySelector('.comment__like');
    const disLikeBtnComment = document.querySelector('.comment__dislike');

    async function updateLikeDislike(e, data, url) {
        e.preventDefault();
        if (!document.querySelector('.navigation__logout')) {
            return window.open('/ms2a', '_self');
        }
        if (e.target.classList.contains('active')) {
            e.target.classList.remove('active');
            e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent - 1;
            data[data.type] = -1;
        } else {
            e.target.classList.add('active');
            e.target.nextElementSibling.textContent = +e.target.nextElementSibling.textContent + 1;
            data[data.type] = 1;
        }
        if (data.btn.classList.contains('active')) {
            data.btn.classList.remove('active');
            data.btn.nextElementSibling.textContent = +data.btn.nextElementSibling.textContent - 1;
            data[data.sType] = -1
        }
        try {
            await axios({
                method: 'patch',
                url,
                data
            });
        } catch (er) {
            document.querySelectorAll('button').forEach(btn => {
                btn.style.pointerEvents = 'none';
            });
        }

    }
    //video
    if (likeBtn) likeBtn.addEventListener('click', (e) => {
        let data = {
            type: 'like',
            sType: 'dislike',
            updateLike: true,
            btn: disLikeBtn,
            videoId: window.location.pathname.split("/")[2]
        }
        let url = '/api/videos/likedislikes/update';
        updateLikeDislike(e, data, url)
    });
    if (disLikeBtn) disLikeBtn.addEventListener('click', (e) => {
        let data = {
            type: 'dislike',
            sType: 'like',
            updateDislike: true,
            btn: likeBtn,
            videoId: window.location.pathname.split("/")[2]
        }
        let url = '/api/videos/likedislikes/update';
        updateLikeDislike(e, data, url)
    });
    //comment
    if (likeBtnComment) likeBtnComment.addEventListener('click', (e) => {
        let data = {
            type: 'like',
            sType: 'dislike',
            updateLike: true,
            btn: disLikeBtnComment,
            commentId: e.target.dataset.comment
        }
        let url = '/api/comment/likedislikes/update';
        updateLikeDislike(e, data, url)
    });
    if (disLikeBtnComment) disLikeBtnComment.addEventListener('click', (e) => {
        let data = {
            type: 'dislike',
            sType: 'like',
            updateDislike: true,
            btn: likeBtnComment,
            commentId: e.target.dataset.comment
        }
        let url = '/api/comment/likedislikes/update';
        updateLikeDislike(e, data, url)
    });

})();

//postComment
(() => {
    const CommentBtn = document.querySelector('.video__comments-post');
    if (!CommentBtn) return;
    CommentBtn.addEventListener('click', postComment);
    async function postComment() {
        const commentsContainer = document.querySelector('.video__comments-container');
        const dAlert = document.querySelector('.alertEr');
        const comment = String(document.querySelector('.video__comments-input input').value);
        if (!commentsContainer || !dAlert) return;
        try {
            if (comment.length < 2 || comment.length > 200) {
                dAlert.innerHTML = 'حدث خطأ';
                dAlert.classList.add('active');
                return;
            }
            if (!document.querySelector('.navigation__logout')) {
                return window.open('/ms2a', '_self');
            }
            dAlert.classList.remove('active');
            let videoId = window.location.pathname.split("/")[2];
            const res = await axios({
                method: "POST",
                url: `/api/videos/${videoId}/comment`,
                data: { comment }
            });
            if (res.data.status == 200) {
                const comment = document.createElement('div');
                comment.classList.add('video__comment-placeHolder');
                comment.innerHTML = `
                <div class="video__comment-flexy"><div class="video__user-image video__user"><img class="video__user-image" src='/api/v1/videos/image/${res.data.userphoto}'>
                </div><div class="video__user-info"><h4 class="video__user-name"> ${res.data.username} <span class="video__user-published-time">${new Date(res.data.comment.dateOfCreation).toLocaleDateString()}</span>
                </h4><p class="video__user-comment">${res.data.comment.comment}</p></div></div><div class="video__user-statis"><div class="video__block">
                <div class="video__info"><div class="video__info-hor video__like-dislike"><div class="video__container">
                <button class="video__button video__like" data-comment='${res.data.comment.id}'><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></svg></button>
                <span class="video__span video__likes"></span></div><div class="video__container">
                <button class="video__button video__dislike" data-comment='${res.data.comment.id}'>
                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></svg></button>
                <span class="video__span video__dislikes"></span></div></div></div></div></div>`;
                commentsContainer.insertAdjacentElement('afterbegin', comment);
                let nbrOfC = +document.querySelector('.video__comments-info--inc').textContent + 1;
                document.querySelector('.video__comments-info--inc').textContent = nbrOfC;
                document.querySelector('.video__comments-input input').value = '';
                return;
            }
        } catch (er) {
            dAlert.innerHTML = 'حدث خطأ';
            dAlert.classList.add('active');
            return;
        }
    }
})();

//logout
(() => {
    const logout = document.querySelector('.navigation__logout');
    if (!logout) return;
    logout.addEventListener('click', userLogout);
    async function userLogout(e) {
        e.preventDefault();
        try {
            const res = await axios({
                method: "get",
                url: `/api/user/logout`
            });
            if (res.data.status == 200) {
                return setTimeout(() => {
                    window.location.reload(true);
                }, 1500);
            }
        } catch (er) {
            console.log(er.response);
        }
    }
})();

//UpdateMe
(() => {
    //update User Name
    const updateNameBtn = document.querySelector('.ms2aa__button.cn');
    if (!updateNameBtn) return;
    updateNameBtn.addEventListener('click', updateUserName);
    async function updateUserName(e) {
        e.preventDefault();
        let name = document.getElementById('username').value;
        try {
            const res = await axios({
                method: "patch",
                url: `/api/user/updateMe`,
                data: { name }
            });
            if (res.data.status == 200) {
                document.getElementById('signup__msg').textContent = 'تم تعيير الاسم';
                document.getElementById('signup__msg').classList.add('success');
            }
        } catch (er) {
            document.getElementById('signup__msg').textContent = 'حدث خطأ';
            document.getElementById('signup__msg').classList.remove('success');
        }
    }

    //update User Password
    const updatePasswordBtn = document.querySelector('.ms2aa__button.cp');
    updatePasswordBtn.addEventListener('click', updatePassword);
    async function updatePassword(e) {
        e.preventDefault();
        let currentPassword = document.getElementById('password').value;
        let password = document.getElementById('newpassword').value;
        let passwordConfirm = document.getElementById('confirmpassword').value;
        try {
            const res = await axios({
                method: "patch",
                url: `/api/user/updatePassword`,
                data: { currentPassword, password, passwordConfirm }
            });
            if (res.data.status == 200) {
                document.getElementById('signup__msg').textContent = 'تم تعيير كلمة السر';
                document.getElementById('signup__msg').classList.add('success');
            }
        } catch (er) {
            document.getElementById('signup__msg').textContent = 'حدث خطأ';
            document.getElementById('signup__msg').classList.remove('success');
        }
    }

    //update User Photo
    async function updatePhoto(e) {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('photo', document.getElementById('photo').files[0]);
            const res = await axios({
                method: 'PATCH',
                url: `/api/user/updatePhoto`,
                data: form
            });
            if (res.data.status == 'succes') {
                window.location.reload();
            }
        } catch (er) {
        }
    }
    document.querySelector('.userphoto').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('photo').click();
        return;
    });
    document.getElementById('photo').addEventListener('change', updatePhoto)
})();

//contactUs
(() => {
    const contactMe = document.getElementById('contactMe');
    if (!contactMe) return;
    contactMe.addEventListener('click', contact);
    async function contact(e) {
        e.preventDefault();
        if (!document.querySelector('.navigation__logout')) {
            document.getElementById('signup__msg').textContent = 'المرجو تسجيل الدخول';
            return;
        }
        const message = document.getElementById('clientMSH').value;
        try {
            const res = await axios({
                method: "POST",
                url: `/api/user/contact`,
                data: { message }
            });
            if (res.data.status == 200) {
                document.getElementById('signup__msg').innerHTML = 'شكرا <br> المرجو تفقد بريدك الالكتروني';
                document.getElementById('signup__msg').classList.add('success');
            }
        } catch (er) {
            document.getElementById('signup__msg').textContent = 'حدث خطأ';
            document.getElementById('signup__msg').classList.remove('success');
        }
    }
})();

//subscribe
(()=>{
    const noAds = document.querySelector('.noAds');
    if(!noAds) return;
    var stripe = Stripe("pk_test_51IRvEdIPX65KpOPVjDxwIXQpm7AdyAFlQXtXlRr1mdMFesjM5TvJiNzZXC5rQooim98YNbuemROaTNwnZMjQFnws00DuREInfM");
    if(!noAds) return;
    noAds.addEventListener('click', subscribe);
    async function subscribe(e){
        e.preventDefault();
        if(!document.querySelector('.navigation__logout')){
            return window.open('/ms2a', '_self');
        }
        try{
            const session = await axios('/api/subscribe/checkout-session');
            if(session.data.session.id){
                console.log(session);
                stripe.redirectToCheckout({ sessionId: session.data.session.id });
            }
        }catch(er){
            console.log(er.response);
        }
    }
})();

(()=>{
    const searchBtn = document.querySelector('.navigation__searchSubmit');
    const searchInput = document.querySelector('.navigation__searchBar');
    searchBtn.addEventListener('click', sendSearch.bind(searchInput));
    searchInput.addEventListener('keydown', (e) => e.keyCode == 13 && sendSearch.bind(searchInput)(e));

    function sendSearch(e){
        e.preventDefault();
        if(this.value.length == 0) return;
        window.open(`/search/${this.value}`, '_self');
    }

})();