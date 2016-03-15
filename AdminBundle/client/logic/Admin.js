Template.SideNav.events({
    'click .sidebar li a': function (e, t) {
	//Get the clicked link and the next element
	var $this = $(e.currentTarget);
	var checkElement = $this.next();
	
	//Check if the next element is a menu and is visible
	if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
	    //Close the menu
	    checkElement.slideUp('normal', function () {
		checkElement.removeClass('menu-open');
	    });
	    checkElement.parent("li").removeClass("active");
	}
	//If the menu is not visible
	else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
	    //Get the parent menu
	    var parent = $this.parents('ul').first();
	    //Close all open menus within the parent
	    var ul = parent.find('ul:visible').slideUp('normal');
	    //Remove the menu-open class from the parent
	    ul.removeClass('menu-open');
	    //Get the parent li
	    var parent_li = $this.parent("li");
	    
	    //Open the target menu and add the menu-open class
	    checkElement.slideDown('normal', function () {
		//Add the class active to the parent li
		checkElement.addClass('menu-open');
		parent.find('li.active').removeClass('active');
		parent_li.addClass('active');
	    });
	}
	//if this isn't a link, prevent the page from being redirected
	if (checkElement.is('.treeview-menu')) {
	    e.preventDefault();
	}
    }
});
