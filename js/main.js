import galleryItems from './gallery-items.js'

const galleryUl = document.querySelector('.gallery')
const galleryModal = document.querySelector('.js-lightbox')
const btnCloseModal = document.querySelector('.lightbox__button')
const bigPicture = document.querySelector('.lightbox__image')
const overlay = document.querySelector('.lightbox__overlay')


const imagesLi = galleryItems.map((el,i) =>
`<li class="gallery__item">
  <a
    class="gallery__link"
    href=${el.original}
  >
    <img
      class=gallery__image
      src=${el.preview}
      data-source=${el.original}
      alt=${el.description}
      data-index=${i}
    />
  </a>
</li>`).join('')

galleryUl.insertAdjacentHTML(`beforeend`, imagesLi)

const onModalOpen = () => {
  galleryModal.classList.add('is-open')
  window.addEventListener('keyup', onEscClose)
  window.addEventListener('keydown', onArrowsClick)
} 
const closeModal = (event) => {
  galleryModal.classList.remove('is-open')
  bigPicture.src = '';
  bigPicture.alt = '';
  window.removeEventListener('keyup', onEscClose)
  window.removeEventListener('keydown', onArrowsClick)
}
const onOverlayClose = (event) => {
  if (event.target === overlay) {
    closeModal()
  }
}

const onEscClose = (event) => {
  if (event.code  === 'Escape') {
     closeModal()
  }
 }
   
// const onArrowsClick = (event) => {
//   let i = +event.target.firstElementChild.dataset.index;
  
//   if (event.code === 'ArrowLeft' && i > 0) {
//     console.log('left');
//     i -= 1
//     muvSlider(event,i)
     
//   } else if (event.code === 'ArrowLeft' && i===0) {
//     i = galleryItems.length-1
//     muvSlider(event,i)
  
//   }
//   else if (event.code === 'ArrowRight' && i < galleryItems.length - 1) {
//     console.log('Right');
//     i += 1
//     muvSlider(event,i)
//   }
//   else if (event.code === 'ArrowRight' && i===galleryItems.length - 1) {
//     i = 0
//     muvSlider(event,i)
//   }

// }

const onArrowsClick = e =>{
let i = +e.target.firstElementChild.dataset.index;
  if (e.key === "ArrowLeft" &&  i> 0){
    i-=1 
    muvSlider(e, i)
  }
  else if (e.key === "ArrowLeft" &&  i === 0){
    i = galleryItems.length -1
    muvSlider(e, i)
  }
  else if (e.key === "ArrowRight" && i < galleryItems.length -1){
    i+=1 
    muvSlider(e, i)
  }
  else if (e.key === "ArrowRight" &&  i === galleryItems.length -1){
    i = 0
    muvSlider(e, i)
  }
}



const muvSlider = (event,index) => {
  event.target.firstElementChild.dataset.index = index
  bigPicture.src = galleryItems[index].original
}

const modalFn = (event) => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG' ) {
    return 
  }
  bigPicture.src = event.target.dataset.source;
  bigPicture.alt = event.target.alt;
  // bigPicture.dataset.index = event.target.dataset.index;
  onModalOpen()
}


galleryUl.addEventListener('click', modalFn)
btnCloseModal.addEventListener('click', closeModal);
galleryModal.addEventListener('click', onOverlayClose);

