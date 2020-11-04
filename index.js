class Observer {
    #element;
    constructor() {
        this.observer = null;
    }

    subscribe(element, callBack, config) {
        if(!(element instanceof HTMLElement)) {
            throw new TypeError('Pass the selector as the Element argument.')
        }
        this.observer = new MutationObserver((mutationRecords) => {
            if(!this.#element && config.textNode) {
                callBack();
                config.stopImmediately&&this.observer.disconnect();
                return  mutationRecords;
            }
            for(let mutation of mutationRecords) {
                for(let node of mutation.addedNodes) {
                    if (!config.textNode &&!(node instanceof HTMLElement)) continue;
                    if(this.#element) {
                        if(this.checkSelector(node)) {
                            callBack(node);
                            config.stopImmediately&&this.observer.disconnect();
                        }
                    } else {
                        callBack(node);
                        config.stopImmediately&&this.observer.disconnect();
                    }
                }
            }
        });
        this.observer.observe(element,config);
    }
    checkSelector(node) {
        if(this.#element.type === 'id' && node.id === this.#element.selector.slice(1)) {
            return true;
        } else if(this.#element.type === 'class' && node.classList.contains(this.#element.selector.slice(1))) {
            return true;
        } else if(this.#element.type === 'attr' && node.matches(this.#element.selector)) {
            return true
        } else if(node.querySelector(this.#element.selector)) {
            return true
        }
        return false;
    }
    unsubscribe() {
        this.observer.disconnect();
    }
    remove() {
        this.observer = null;
    }
    defineElement(element) {
        const data = {
            selector:element,
            type: null,
        };
        if(/(\w+)?\.\w+/.test(element)) {
            data.type = 'class';
        } else if(/(\w+)?\#\w+/.test(element)) {
            data.type = 'id';
        } else if (/(\w+)?\[\w+=(('\w+')|("\w+"))\]/.test(element)) {
            data.type = 'attr';
        } else {
            throw new TypeError(`I don't know what kind of element`);
        }
        return data;
    }
    waitElement(element,callback) {
        if(!element.length) {
            throw new TypeError('The selector for search cannot be empty.')
        }
        const body = document.documentElement || document.body;
        this.#element = this.defineElement(element);
        this.subscribe(body,callback, {
            childList: true,
            subtree: true,
            stopImmediately: true,
            textNode: false
        })
    }
}