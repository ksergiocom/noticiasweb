function createArticle(data){
	const gridContainer = document.querySelector('#grid-container')

	const a = document.createElement('a')
	a.setAttribute('href',data.link)
	const article = document.createElement('article')
	article.classList = ['overflow-hidden flex relative w-full h-full p-5 py-12 bg-black group text-center justify-center']
	const img = document.createElement('img')
	img.classList = 
    ["absolute top-0 left-0 h-full w-full object-cover opacity-10 group-hover:opacity-50"];
	img.setAttribute('src',data.img)
	img.setAttribute('alt',data.titulo)
	const divWraper = document
    .createElement("div")
	divWraper.classList = ["flex flex-col gap-5 relative text-white"]
	const subDivWraper = document.createElement('div')
	const h5 = document.createElement('p')
	h5.innerText = data.periodico
	const h3 = document.createElement('h3')
	h3.innerText = data.titulo
	h3.classList = ["text-3xl font-bold"]
	const p = document.createElement('p')
	const small = document.createElement('small')
	small.innerText = data.fecha

	gridContainer.appendChild(a);
	a.appendChild(article)
	article.appendChild(img)
	article.appendChild(divWraper);
	divWraper.appendChild(subDivWraper)
	subDivWraper.appendChild(h5);
	subDivWraper.appendChild(h3)
	subDivWraper.appendChild(p)
	p.appendChild(small)

}