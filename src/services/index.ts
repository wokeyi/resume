import ApiService from './ApiService'

ApiService.config({
  baseUrl: window.location.origin,
})

export {
  ApiService,
}
