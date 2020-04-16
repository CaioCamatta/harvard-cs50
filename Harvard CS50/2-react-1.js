/* --------------- Third lecture, including notes --------------- */
// CLASSES
//  standard OO classes, with instances, properties, methods, static functions, etc.,
class Set{
    constructor(arr){
        this.arr = arr
    }

    add(val){
        if(!this.has(val)) this.arr.push(val)
    }

    delete(val){
        this.arr = this.arr.filter(x => x !== val)
    }

    has(val){
        return this.arr.includes(val)
    }
    
    // get just means the function is a getter. Binds a property to a function, that is, you can call set.size to retreive it, instead of set.size()
    get size(){
        return this.arr.length
    }
}

const s = new Set([1,2,3,4,5])

// trying to add the same value shouldn't work
s.add(1)
s.add(1)
s.add(1)
console.log('s should have 5 members and actually has:', s.size)

console.log('s should contain 5:', s.has(5))

s.add(6)
console.log('s should contain 6:', s.has(6))
console.log('s should have 6 members and actually has:', s.size)

s.delete(6)
console.log('s should no longer contain 6:', !s.has(6))
console.log('s should have 5 members and actually has:', s.size)

// REACT
//  imperative code: steps on how to get to what you want. Very step by step
//  declarative(react): just say waht you want and the library will take care of it 
//  react is componentized: consistent, fast to modify
const slides = [
{
    title: 'React',
    bullets: [
    'Allows us to write declarative views that "react" to changes in data',
    'Allows us to abstract complex problems into smaller components',
    'Allows us to write simple code that is still performant',
    ],
},
{
    title: 'React is Declarative',
    bullets: [
    'Imerative vs Declarative',
    "The browser APIs aren't fun to work with",
    'React allows us to write what we want, and the library will take care of the DOM manipulation',
    ],
},
{
    title: 'React is Easily Componentized',
    bullets: [
    'Breaking a complex problem into discrete components',
    'Can reuse these components',
    "React's declarative nature makes it easy to customize components",
    ],
},
]

const slideShow = (
<div>
    {slides.map(slide => <Slide slide={slide} />)}
</div>
)

// pseudocode (declarative)
const Slide = slide => (
<div>
    <h1>{slide.title}</h1>
    <ul>
    {slide.bullets.map(bullet => <li>{bullet}</li>)}
    </ul>
</div>
)

//  Reconciliation: react syncs changes in app state to the DOM, i.e. only makes necessary changes