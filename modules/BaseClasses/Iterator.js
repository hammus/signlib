module.exports = (function () {
    /**
     * Creates an Iterable Collection object
     * @class
     * @name Iterator
     * @param {Array|*} itemsArr Collection Content
     */
    var Iterator = function (itemsArr) {


        return {
            /**
             * Tracking property for collection iteration, Iterator.index
             * @type {number}
             * @memberof Iterator
             * @name index
             */
            index: 0,

            /**
             * Holds the Collection
             * @memberof Iterator
             * @type {Array|*}
             */
            items: itemsArr,

            /**
             * How many items are in the Array?
             * @memberof Iterator
             */
            length: itemsArr.length,

            /**
             * Add an item to the collection
             * @memberof Iterator
             * @param {*} item - The item to add
             * @returns {exports}
             */
            add: function (item) {
                this.items.push(item);
                return this;
            },

            /**
             * Add an item add to the collection at the specified index
             * @memberof Iterator
             * @param {*} item - The item to add
             * @param {Number} index - The index at which to add the item
             * @returns {exports}
             */
            addAt: function (item, index) {
                this.items.splice(index, 0, item);
                return this;

            },

            /**
             * Get the entire collection
             * @memberof Iterator
             * @returns {Array|*}
             */
            all: function () {
                return this.items
            },

            /**
             * Get the first item in the collection optionally resetting the collection
             * @memberof Iterator
             * @param {boolean} [reset]
             * @returns {*}
             */
            first: function (reset) {
                reset = reset || false;
                if (reset) return this.reset().current();
                return this.items[0];
            },

            /**
             * Get the current item in the collection
             * @memberof Iterator
             * @returns {*}
             */
            current: function () {
                return this.items[this.index];
            },

            /**
             * Gets the next item in the collection
             * @memberof Iterator
             * @returns {*}
             */
            next: function () {
                return this.items[this.index++];
            },

            /**
             * Returns True is the current item is not the last in the collection
             * @memberof Iterator
             * @returns {boolean}
             */
            hasNext: function () {
                return this.index <= this.items.length;
            },

            /**
             * Reset the current item to first in the collection
             * @memberof Iterator
             * @return {exports}
             */
            reset: function () {
                this.index = 0;
                return this;
            },
            /**
             * Iterate over the collection in
             * @memberof Iterator
             * @param {function} callback
             * @returns {exports}
             */
            each: function (callback) {
                for (var item = this.first(); this.hasNext(); item = this.next()) {
                    callback(item);
                }
                return this;
            },



            /**
             * Get an item from the collection by its Index
             * @memberof Iterator
             * @param {Number} index
             * @returns {*}
             */
            get: function (index) {
                return this.item[index];
            },



            /**
             * Pop the last value off the Collection and return it
             * @memberof Iterator
             * @returns {T}
             */
            pop: function () {
                return this.items.pop()
            },

            /**
             * @alias Iterator.length
             * @type {number}
             */
            count: this.length,

            /**
             * @alias Iterator#add
             */
            push: function (item) {
                this.add(item);
            }


        };
    };

    return Iterator;
})();