/*---------------theme light and dark mode -----------------*/
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () =>{
	document.body.classList.toggle("dark");
	if (document.body.classList.contains("dark")) {
		localStorage.setItem("theme","dark");
	}
	else{
		localStorage.setItem("theme","light");
	}
	updateIcon();
})

function themeModal(){
	// checking if 'theme' key exists
	if (localStorage.getItem("theme") !== null) {
		if (localStorage.getItem("theme") === "light") {
			document.body.classList.remove("dark");
		}
		else{
			document.body.classList.add("dark");
		}
	}
	updateIcon();
}
themeModal();

function updateIcon(){ 
	// body...
	if (document.body.classList.contains("dark")) {
		dayNight.querySelector("i").classList.remove("fa-moon");
		dayNight.querySelector("i").classList.add("fa-sun");
	}
	else{
		dayNight.querySelector("i").classList.remove("fa-sun");
		dayNight.querySelector("i").classList.add("fa-moon");
	}
}
window.addEventListener("load", () =>{
	if (document.body.classList.contains("dark")) {
		dayNight.querySelector("i").classList.add("fa-sun");
	}
	else{
		dayNight.querySelector("i").classList.add("fa-moon");
	}
})