import get from './getElement.js'

// #8 - get()
const loading = get(.loading)

export const showLoading = () => {
    loading.classList.remove('hide-loading')
}

export const hideLoading = () => {
    loading.classList.add('hide-loading')
}