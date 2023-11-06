class Storage {
    constructor() {
        this.s = localStorage
    }

    get(key) {
        let v = this.s.getItem(key)
        let value = JSON.parse(v)
        return value
    }

    set(key, value) {
        let v = JSON.stringify(value)
        this.s.setItem(key, v)
    }

    remove(key) {
        this.s.removeItem(key)
    }

    clear() {
        this.s.clear()
    }
}

let __storage = new Storage()
// console.log('current userInfo', __storage.get('userInfo'))

export default __storage