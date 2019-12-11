const person = {
    info: {
        name: 'marron',
        desc: 'marron is handsome',
    },
    get name() {
        return this.info.name
    },
    get desc() {
        return this.info.desc
    },
    set name(val) {
        this.info.name = val;
    }

}

