let page = 1
let hasMore = true

async function loadMore(){
	if (!hasMore) return false;
	hasMore = false

	document.getElementById("spinner").style.display = 'block';

	const res = await fetch('/ajax?' + new URLSearchParams({
		page
	}))

	const data = await res.json()


	if(data.length>0){
		page++
		data.forEach(element => {
			createArticle(element)
		});
	}

	document.getElementById("spinner").style.display = "none";

	if(data.length>0){
		hasMore = true
	}
}

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight*0.90
  ) {
		if(hasMore){
			loadMore();
		}
  }
});