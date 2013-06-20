$(document).ready(function(){
		var mapWidth = 400;
		var mapHeight = 400;
		var mapZoom = 1;
		
		var lastX = 0, lastY = 0;
		var clicking = false;
		
		$('#mapHolder').css('width', mapWidth);
		$('#mapHolder').css('height', mapHeight);
		
		var paper = Raphael("mapHolder", mapWidth, mapHeight);
  		var mapImage = paper.image("Figure1-WorldAtlas-large.jpg", 0, 0, mapWidth, mapHeight);
  		
  		
  		/* map menu */
  		var mapMenuHolderWidth = 40;
  		var mapMenuHolderHeight = 216;
  		var mapMenuHolderX = mapWidth - mapMenuHolderWidth - 6;
  		var mapMenuHolderY = 5;
  		
  		var mapMenuHolder = paper.rect(mapMenuHolderX, mapMenuHolderY, mapMenuHolderWidth, mapMenuHolderHeight, 12).attr({fill: 'black', stroke: '#aaa', 'stroke-width': 2, opacity: 0.7});
  		
  		var maxIcon = paper.path("M22.646,19.307c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127l3.535-3.537L22.646,19.307zM13.688,20.369c-3.582-0.008-6.478-2.904-6.484-6.484c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486C20.165,17.465,17.267,20.361,13.688,20.369zM15.687,9.051h-4v2.833H8.854v4.001h2.833v2.833h4v-2.834h2.832v-3.999h-2.833V9.051z").attr({fill: "#bbb", stroke: "#000", translation: (mapMenuHolderX+5) + ', '+(mapMenuHolderY + 10)});
  		var minIcon = paper.path("M22.646,19.307c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127l3.535-3.537L22.646,19.307zM13.688,20.369c-3.582-0.008-6.478-2.904-6.484-6.484c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486C20.165,17.465,17.267,20.361,13.688,20.369zM8.854,11.884v4.001l9.665-0.001v-3.999L8.854,11.884z").attr({fill: "#bbb", stroke: "#000", translation: (mapMenuHolderX+5) + ', '+(mapMenuHolderY + 7+ 34)});
  		var arrowTop = paper.path("M239.918,118.73c-0.001,0.001-1.773,2.879-1.773,2.879c-1.861,3.023-18.787,30.315-39.705,57.427     c-29.781,38.601-51.503,56.577-68.363,56.577l0,0c-16.859,0-38.582-17.977-68.362-56.577     c-20.96-27.165-37.851-54.41-39.707-57.427l-1.774-2.881c-1.58-2.565-1.648-5.794-0.177-8.425     c1.469-2.63,4.255-4.264,7.267-4.264c0,0,42.486,0,48.73,0c0-6.507,0-69.324,0-69.324c0-4.591,3.734-8.325,8.325-8.325l91.397-0.001c4.59,0,8.324,3.735,8.324,8.325c0,0,0,62.817,0,69.325c6.244,0,48.73,0,48.73,0c3.014,0,5.799,1.635,7.268,4.266 C241.567,112.933,241.5,116.162,239.918,118.73z").attr({fill: "#bbb", stroke: "#000", scale: 0.10, translation: '245, -25', rotation: 180});
  		var arrowLeft = paper.path("M239.918,118.73c-0.001,0.001-1.773,2.879-1.773,2.879c-1.861,3.023-18.787,30.315-39.705,57.427     c-29.781,38.601-51.503,56.577-68.363,56.577l0,0c-16.859,0-38.582-17.977-68.362-56.577     c-20.96-27.165-37.851-54.41-39.707-57.427l-1.774-2.881c-1.58-2.565-1.648-5.794-0.177-8.425     c1.469-2.63,4.255-4.264,7.267-4.264c0,0,42.486,0,48.73,0c0-6.507,0-69.324,0-69.324c0-4.591,3.734-8.325,8.325-8.325l91.397-0.001c4.59,0,8.324,3.735,8.324,8.325c0,0,0,62.817,0,69.325c6.244,0,48.73,0,48.73,0c3.014,0,5.799,1.635,7.268,4.266 C241.567,112.933,241.5,116.162,239.918,118.73z").attr({fill: "#bbb", stroke: "#000", scale: 0.10, translation: '245, 4', rotation: 90});
  		var arrowRight = paper.path("M239.918,118.73c-0.001,0.001-1.773,2.879-1.773,2.879c-1.861,3.023-18.787,30.315-39.705,57.427     c-29.781,38.601-51.503,56.577-68.363,56.577l0,0c-16.859,0-38.582-17.977-68.362-56.577     c-20.96-27.165-37.851-54.41-39.707-57.427l-1.774-2.881c-1.58-2.565-1.648-5.794-0.177-8.425     c1.469-2.63,4.255-4.264,7.267-4.264c0,0,42.486,0,48.73,0c0-6.507,0-69.324,0-69.324c0-4.591,3.734-8.325,8.325-8.325l91.397-0.001c4.59,0,8.324,3.735,8.324,8.325c0,0,0,62.817,0,69.325c6.244,0,48.73,0,48.73,0c3.014,0,5.799,1.635,7.268,4.266 C241.567,112.933,241.5,116.162,239.918,118.73z").attr({fill: "#bbb", stroke: "#000", scale: 0.10, translation: '245, 33', rotation: -90});
  		var arrowBottom = paper.path("M239.918,118.73c-0.001,0.001-1.773,2.879-1.773,2.879c-1.861,3.023-18.787,30.315-39.705,57.427     c-29.781,38.601-51.503,56.577-68.363,56.577l0,0c-16.859,0-38.582-17.977-68.362-56.577     c-20.96-27.165-37.851-54.41-39.707-57.427l-1.774-2.881c-1.58-2.565-1.648-5.794-0.177-8.425     c1.469-2.63,4.255-4.264,7.267-4.264c0,0,42.486,0,48.73,0c0-6.507,0-69.324,0-69.324c0-4.591,3.734-8.325,8.325-8.325l91.397-0.001c4.59,0,8.324,3.735,8.324,8.325c0,0,0,62.817,0,69.325c6.244,0,48.73,0,48.73,0c3.014,0,5.799,1.635,7.268,4.266 C241.567,112.933,241.5,116.162,239.918,118.73z").attr({fill: "#bbb", stroke: "#000", scale: 0.10, translation: '245, 63'});
  		
  		var menuItemsMouseOver = function(){ /*this.node.style.cursor = 'pointer';  */ this.attr({fill:'#fff'}); };
  		var menuItemsMouseOut = function(){ /*this.node.style.cursor = 'default';  */ this.attr({fill:'#bbb'}); };
  		var menuItemsMouseDown = function(){ this.attr({fill:'#777'}); };
  		
  		maxIcon.mouseover(menuItemsMouseOver); maxIcon.mouseout(menuItemsMouseOut);
  		minIcon.mouseover(menuItemsMouseOver); minIcon.mouseout(menuItemsMouseOut);
  		arrowTop.mouseover(menuItemsMouseOver); arrowTop.mouseout(menuItemsMouseOut);
  		arrowBottom.mouseover(menuItemsMouseOver); arrowBottom.mouseout(menuItemsMouseOut);
  		arrowLeft.mouseover(menuItemsMouseOver); arrowLeft.mouseout(menuItemsMouseOut);
  		arrowRight.mouseover(menuItemsMouseOver); arrowRight.mouseout(menuItemsMouseOut);
  		
  		maxIcon.mousedown(menuItemsMouseDown); maxIcon.mouseup(menuItemsMouseOver);
  		minIcon.mousedown(menuItemsMouseDown); minIcon.mouseup(menuItemsMouseOver);
  		arrowTop.mousedown(menuItemsMouseDown); arrowTop.mouseup(menuItemsMouseOver);
  		arrowBottom.mousedown(menuItemsMouseDown); arrowBottom.mouseup(menuItemsMouseOver);
  		arrowLeft.mousedown(menuItemsMouseDown); arrowLeft.mouseup(menuItemsMouseOver);
  		arrowRight.mousedown(menuItemsMouseDown); arrowRight.mouseup(menuItemsMouseOver);
  		
  		$(mapMenuHolder.node).mousemove(function(e){ e.stopPropagation(); });
  		$(mapMenuHolder.node).mousedown(function(e){ e.stopPropagation(); });
  		
  		maxIcon.click(function(e){
  			mapZoom++;
  			mapImage.scale(mapZoom, mapZoom);
  			e.stopPropagation();
  			e.preventDefault();
  		}); 
  		
  		minIcon.click(function(e){
  			if (mapZoom == 1) return;
  			mapZoom--;
  			mapImage.scale(mapZoom, mapZoom);
  			adjustMapEdge();
  			e.stopPropagation();
  			e.preventDefault();
  		}); 
  		
  		arrowTop.click(function(e){
  			mapImage.translate(0, 20);
  			adjustMapEdge();
  			e.stopPropagation();
  			e.preventDefault();
  		}); 
  		
  		arrowBottom.click(function(e){
  			mapImage.translate(0, -20);
  			adjustMapEdge();
  			e.stopPropagation();
  			e.preventDefault();
  		}); 
  		
  		arrowLeft.click(function(e){
  			mapImage.translate(20, 0);
  			adjustMapEdge();
  			e.stopPropagation();
  			e.preventDefault();
  		}); 
  		
  		arrowRight.click(function(e){
  			mapImage.translate(-20, 0);
  			adjustMapEdge();
  			e.stopPropagation();
  			e.preventDefault();
  		}); 
  	
  		
  		var adjustMapEdge = function()
  		{
  			if (mapImage.attr('x') > 0) mapImage.attr({'x': 0});
    		if (mapImage.attr('x') < (mapWidth - mapImage.attr('width'))) mapImage.attr({'x': (mapWidth - mapImage.attr('width'))});
    		
 			if (mapImage.attr('y') > 0) mapImage.attr({'y': 0});
    		if (mapImage.attr('y') < (mapHeight - mapImage.attr('height') )) mapImage.attr({'y': (mapHeight - mapImage.attr('height') )});
  		};
  		
  		$('#mapHolder').mousedown(function(e){
    		clicking = true;
    		lastX = e.pageX;
    		lastY = e.pageY;
    		$('#mapHolder').css('cursor', 'move');
    		e.stopPropagation();
    		e.preventDefault();
    	});
		
		
		$(document).mouseup(function(e){
    		clicking = false;
    		$('#mapHolder').css('cursor', 'default');
    		e.stopPropagation();
    		e.preventDefault();
    	});
    	
    	
    	$('#mapHolder').mousemove(function(e){
    		if(clicking == false) return;
    		
    		var currentMapPosX = 0, currentMapPosY = 0;
    		
    		if ((mapImage.attr('x') <= 0) && (mapImage.attr('x') >= (mapWidth - mapImage.attr('width'))))
    		{
    			currentMapPosX = e.pageX - lastX;
    		}
    		
    		if ((mapImage.attr('y') <= 0) && (mapImage.attr('y') >= (mapHeight - mapImage.attr('height'))))
    		{
    			currentMapPosY = e.pageY - lastY;
    		}
    		
    		mapImage.translate(currentMapPosX, currentMapPosY);
    		lastX = e.pageX;
    		lastY = e.pageY;
    		
    		if (mapImage.attr('x') > 0) mapImage.attr({'x': 0});
    		if (mapImage.attr('x') < (mapWidth - mapImage.attr('width'))) mapImage.attr({'x': (mapWidth - mapImage.attr('width'))});
    		
 			if (mapImage.attr('y') > 0) mapImage.attr({'y': 0});
    		if (mapImage.attr('y') < (mapHeight - mapImage.attr('height') )) mapImage.attr({'y': (mapHeight - mapImage.attr('height') )});
    	});		
		
		$(mapImage.node).mousedown(function(e){
    		e.preventDefault();
    	});
    	
    	$(mapImage.node).mousedown(function(e){
    		e.preventDefault();
    	});
  	});