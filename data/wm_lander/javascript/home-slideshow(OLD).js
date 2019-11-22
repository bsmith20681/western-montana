var slideLink = [];
slideLink[1] = '/weston-Collection-306467';
slideLink[2] = '/malibu-Collection-306469';
slideLink[3] = '/marco-Collection-350744';
slideLink[4] = '/presilla-Collection-351116';

slideNum = 4; // Specify the number of slides
slideWait = 6; // Specify number of seconds before each transition
slideTrans = 75; // Specify the transition speed. The higher the number, the slower the transition.

currentSlide = 1;
nextSlide = currentSlide + 1;
currentOpacity1 = 100;
currentOpacity2 = 0;
slideWaitVar = slideWait + '000';

function divSlideOpacity()
{
	if (currentOpacity1 == 10)
	{
		document.getElementById('slideBox' + currentSlide).style.opacity = "0";
		document.getElementById('slideBox' + currentSlide).style.filter = "alpha(opacity=0)";
		document.getElementById('slideBox' + nextSlide).style.opacity = "1";
		document.getElementById('slideBox' + nextSlide).style.filter = "alpha(opacity=100)";
		document.getElementById("slideHolder").innerHTML = 
		'<a href="'+ slideLink[nextSlide] +'"><div id="slideLinkBox">' +
			'<img id="slideBox1" class="slide" src="/lighting-data/homepage_images/slide_images/slide1.jpg" />' +
			'<img id="slideBox2" class="slide" src="/lighting-data/homepage_images/slide_images/slide2.jpg" />' +
			'<img id="slideBox3" class="slide" src="/lighting-data/homepage_images/slide_images/slide3.jpg" />' +
			'<img id="slideBox4" class="slide" src="/lighting-data/homepage_images/slide_images/slide4.jpg" />' +
		'</div></a>';
		currentOpacity1 = 100
		currentOpacity2 = 0;
		currentSlide = currentSlide + 1;
		nextSlide = nextSlide + 1;
		
		if (currentSlide == slideNum + 1)
		{
			currentSlide = 1;
		}
		if (nextSlide == slideNum + 1)
		{
			nextSlide = 1;
		}
		
		document.getElementById('slideBox' + currentSlide).style.opacity = "1";
		document.getElementById('slideBox' + currentSlide).style.filter = "alpha(opacity=100)";
		document.getElementById('slideBox' + nextSlide).style.opacity = "0";
		document.getElementById('slideBox' + nextSlide).style.filter = "alpha(opacity=0)";
		
		setTimeout("divSlideOpacity()", slideWaitVar);
	}
	else
	{
		currentOpacity1 = currentOpacity1 - 10;
		currentOpacity2 = currentOpacity2 + 10;
		
		document.getElementById('slideBox' + currentSlide).style.opacity = '.' + currentOpacity1;
		document.getElementById('slideBox' + currentSlide).style.filter = 'alpha(opacity='+ currentOpacity1 +')';
		document.getElementById('slideBox' + nextSlide).style.opacity = '.' + currentOpacity2;
		document.getElementById('slideBox' + nextSlide).style.filter = 'alpha(opacity='+ currentOpacity2 +')';
		setTimeout("divSlideOpacity()", slideTrans);
	}
	
	
}