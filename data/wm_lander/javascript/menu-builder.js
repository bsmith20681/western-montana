$(document).ready(function()
{
	menuTimer = '';

	$('.dropTab[data-mode="hover"]').hover(function(event)
	{
    console.log('hi')
		$(this).children('.dropName').addClass('activeDrop');
		$(this).children('a').children('.dropName').addClass('activeDrop');

		var thisVar = this;
		var show = $(thisVar).attr('data-show');
		var delay = $(thisVar).attr('data-delay');
		var direction = $(thisVar).attr('data-direction');

		if (show == null){ var show = 'show'; }
		if (delay == null){ var delay = 0; }

		if (show == 'show')
		{
			clearTimeout(menuTimer);
			menuTimer = setTimeout(function(){ $(thisVar).children('.dropBox').show(); }, delay);
		}
		if (show == 'fade')
		{
			clearTimeout(menuTimer);
			menuTimer = setTimeout(function(){ $(thisVar).children('.dropBox').fadeIn(250); }, delay);
		}
		if (show == 'slide')
		{
			clearTimeout(menuTimer);
			menuTimer = setTimeout(function(){ $(thisVar).children('.dropBox').slideDown(250); }, delay);
		}


		if (direction == 'left')
		{
			$(thisVar).children('.dropBox').addClass('activeLeft');
		}
		if (direction == 'right')
		{
			$(thisVar).children('.dropBox').addClass('activeRight');
		}

	}, function()
	{
		$(this).children('.dropName').removeClass('activeDrop');
		$(this).children('a').children('.dropName').removeClass('activeDrop');

		clearTimeout(menuTimer);
		var hide = $(this).attr('data-hide');
		if (hide == null){ var hide = 'hide'; }

		if (hide == 'hide'){ $(this).children('.dropBox').hide(); }
		if (hide == 'fade'){ $(this).children('.dropBox').stop(true, true).fadeOut(250); }
		if (hide == 'slide'){ $(this).children('.dropBox').stop(true, true).slideUp(250); }
	});


	$('.dropTab[data-mode="click"] .dropName').click(function(event)
	{
		if ($(this).attr('class') == 'dropName activeDrop')
		{
			$(this).removeClass('activeDrop');

			var hide = $(this).closest('.dropTab').attr('data-hide');
			if (hide == null){ var hide = 'hide'; }

			if (hide == 'hide'){ $(this).next('.dropBox').hide(); }
			if (hide == 'fade'){ $(this).next('.dropBox').stop(true, true).fadeOut(250); }
			if (hide == 'slide'){ $(this).next('.dropBox').stop(true, true).slideUp(250); }
		}
		else
		{
			$(this).addClass('activeDrop');

			var show = $(this).closest('.dropTab').attr('data-show');
			if (show == null){ var show = 'show'; }

			if (show == 'show')
			{
				$(this).next('.dropBox').show();
			}
			if (show == 'fade')
			{
				$(this).next('.dropBox').fadeIn(250);
			}
			if (show == 'slide')
			{
				$(this).next('.dropBox').slideDown(250);
			}
		}
	});

	$('.dropTab[data-mode="click"]').mouseleave(function()
	{
		$(this).children('.dropName').removeClass('activeDrop');
		$(this).children('a').children('.dropName').removeClass('activeDrop');

		var hide = $(this).attr('data-hide');
		if (hide == null){ var hide = 'hide'; }

		if (hide == 'hide'){ $(this).children('.dropBox').hide(); }
		if (hide == 'fade'){ $(this).children('.dropBox').stop(true, true).fadeOut(250); }
		if (hide == 'slide'){ $(this).children('.dropBox').stop(true, true).slideUp(250); }
	});
});

//Function for Wordpress API
function wpREST(){
  var blogTitle1 = document.getElementById('blogTitle1'),
      blogTitle2 = document.getElementById('blogTitle2'),
      blogLink1  = document.getElementById('blogLink1'),
      blogLink2  = document.getElementById('blogLink2'),
      blogImage1 = document.getElementById('blogImage1'),
      blogImage2 = document.getElementById('blogImage2'),
      wpURL = 'https://blog.yorklighting.com/wp-json/wp/v2/posts';
  //Fetches Title and URL
  fetch(wpURL)
    .then((response) => response.json())

    .then(function(data){

      blogTitle1.innerHTML = data[0].title.rendered
      blogTitle2.innerHTML = data[1].title.rendered
      blogLink1.href = data[0].link
      blogLink2.href = data[1].link
      blogImage1.src = data[0].fimg_url
      blogImage2.src = data[1].fimg_url
    });

}

wpREST();

//Function to make mobile nav appear
jQuery(document).ready(function(){
    jQuery('.hamburger').click(function(){
        jQuery('#mobileMenu').slideToggle();
        jQuery('.hamburger').toggleClass('active');
    });

});
function checkValue()
{
    searchTerm = document.getElementById('searchForm1-1').value;
    if (searchTerm == "Keyword / Item #" || searchTerm == "")
    {
        searchTerm = "/Lighting-Fixtures";
    }
    else
    {
        searchTerm = '/Lighting-Fixtures&itemNumVal=' + searchTerm
    }
    window.location = searchTerm;
    return false;
};
function changeView(category) {
    jQuery('.mobileNavSection').removeClass('activeSection');
    jQuery('#' + category).addClass('activeSection');
};
