function $ViewScrollProvider(){var o=!1;this.useAnchorScroll=function(){o=!0},this.$get=["$anchorScroll","$timeout",function(r,i){return o?r:function(o){i(function(){o[0].scrollIntoView()},0,!1)}}]}angular.module("ui.router.state").provider("$uiViewScroll",$ViewScrollProvider);