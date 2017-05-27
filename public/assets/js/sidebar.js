$(document).ready(function(){

	$('#sidebar').eq(0).append('<div class="inner">' +
			  '<!-- Menu -->' +
                '<nav id="menu">' +
                  '<header class="major">' +
                    '<h2>Menu</h2>' +
                  '</header>' +
                  '<ul>' +
                    '<li><a href="index.html">Homepage</a></li>' +
                    '<li><a href="allArticles.html">All Articles</a></li>' +
                    '<li><a href="movieList.html">Movie List</a></li>' +
                  '</ul>' +
                '</nav>' +
              '<!-- Section -->' +
                '<section>' +
                  '<header class="major">' +
                    '<h2>Get in touch</h2>' +
                  '</header>' +
                  '<p>Want to become a writer or recommend a movie for us to analyze? Shoot us an' +
                  'email!</p>' +
                  '<ul class="contact">' +
                    '<li class="fa-envelope-o"><a href="mailto:flicktheories@gmail.com">flicktheories@gmail.com</a></li>' +
                  '</ul>' +
                '</section>' +
            '</div>');

});