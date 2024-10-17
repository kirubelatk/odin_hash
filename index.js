class HashMap {
    constructor() {
      this.buckets = new Array(16); // Initial bucket size
      this.size = 0; // Number of key-value pairs
      this.loadFactor = 0.75; // Threshold for expanding buckets
    }
  
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        hashCode = hashCode % this.buckets.length; // Apply modulo on each iteration
      }
      return hashCode;
    }
  
    set(key, value) {
      const index = this.hash(key);
      if (!this.buckets[index]) {
        this.buckets[index] = [];
      }
  
      for (let i = 0; i < this.buckets[index].length; i++) {
        const [storedKey] = this.buckets[index][i];
        if (storedKey === key) {
          // Key already exists, overwrite value
          this.buckets[index][i] = [key, value];
          return;
        }
      }
  
      // Insert new key-value pair
      this.buckets[index].push([key, value]);
      this.size++;
  
      // Check if we need to grow the bucket array
      if (this.size / this.buckets.length >= this.loadFactor) {
        this._resize();
      }
    }
  
    _resize() {
      const newBuckets = new Array(this.buckets.length * 2);
      const oldBuckets = this.buckets;
      this.buckets = newBuckets;
      this.size = 0;
  
      // Rehash all keys and add them to the new buckets
      oldBuckets.forEach(bucket => {
        if (bucket) {
          bucket.forEach(([key, value]) => {
            this.set(key, value);
          });
        }
      });
    }
  
    get(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      if (!bucket) return null;
  
      for (let i = 0; i < bucket.length; i++) {
        const [storedKey, value] = bucket[i];
        if (storedKey === key) return value;
      }
  
      return null;
    }
  
    has(key) {
      return this.get(key) !== null;
    }
  
    remove(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      if (!bucket) return false;
  
      for (let i = 0; i < bucket.length; i++) {
        const [storedKey] = bucket[i];
        if (storedKey === key) {
          bucket.splice(i, 1);
          this.size--;
          return true;
        }
      }
      return false;
    }
  
    length() {
      return this.size;
    }
  
    clear() {
      this.buckets = new Array(16);
      this.size = 0;
    }
  
    keys() {
      const keys = [];
      this.buckets.forEach(bucket => {
        if (bucket) {
          bucket.forEach(([key]) => keys.push(key));
        }
      });
      return keys;
    }
  
    values() {
      const values = [];
      this.buckets.forEach(bucket => {
        if (bucket) {
          bucket.forEach(([, value]) => values.push(value));
        }
      });
      return values;
    }
  
    entries() {
      const entries = [];
      this.buckets.forEach(bucket => {
        if (bucket) {
          bucket.forEach(entry => entries.push(entry));
        }
      });
      return entries;
    }
  }

  
  const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// The hash map should now be full (75% capacity)

test.set('moon', 'silver'); // This should trigger the resizing of the buckets

// Test other methods
console.log(test.get('apple')); // Output: red
console.log(test.has('banana')); // Output: true
console.log(test.remove('carrot')); // Output: true
console.log(test.length()); // Output: 12
console.log(test.keys()); // Output: array of keys
console.log(test.values()); // Output: array of values
console.log(test.entries()); // Output: array of key-value pairs
