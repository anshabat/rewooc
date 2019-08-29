<?php // Silence is golden
//TODO maybe redirect to 404
//for debug
if(have_posts()){
	while(have_posts()){
		the_post();
		the_content();
	}
}