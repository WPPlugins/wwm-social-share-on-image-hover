function execute_wwmfun(e) {
    var t = jQuery('meta[property="og:image"]').attr("content");
    var n = jQuery('meta[name="og:description"]').attr("content");
    var r = jQuery('meta[name="description"]').attr("content");
    var i = WWWM_FilterData(jQuery('meta[name="og:title"]').attr("content"));
    if (jQuery.trim(i) == "") var s = WWWM_FilterData(jQuery("title").text());
    else var s = i;
    var o = WWWM_FilterData(n);
    var u = jQuery(e).parent().prev("img").attr("src");
    var a = document.location.href;
    var f = WWWM_FilterData(r);
    var l = "";
    if (jQuery.trim(u) == "") u = t;
    if (jQuery.trim(n) == "") o = s;
    if (jQuery.trim(r) == "") r = s;
    if (jQuery(e).hasClass("wwm_facebook")) {
        wwm_fb_share(s, a, u, f, o)
    }
    if (jQuery(e).hasClass("wwm_twitter")) {
        var l = "http://twitter.com/home?status=" + escape(s) + "+" + encodeURIComponent(a);
        wwm_common_share(l)
    }
    if (jQuery(e).hasClass("wwm_gplus")) {
        var l = "https://plus.google.com/share?url=" + encodeURIComponent(a);
        wwm_common_share(l)
    }
    if (jQuery(e).hasClass("wwm_pinit")) {
        var l = "http://pinterest.com/pin/create/bookmarklet/?media=" + encodeURIComponent(u) + "&url=" + encodeURIComponent(a) + "& is_video=false&description=" + o;
        wwm_common_share(l)
    }
    if (jQuery(e).hasClass("wwm_tumblr")) {
        var l = "http://www.tumblr.com/share/photo?source=" + encodeURIComponent(u) + "&caption=" + o + "&clickthru=" + encodeURIComponent(a);
        wwm_common_share(l)
    }
    if (jQuery(e).hasClass("wwm_linked")) {
        var l = "http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(a) + "&title=" + s + "&source=" + encodeURIComponent(a);
        wwm_common_share(l)
    }
}

function WWWM_FilterData(e) {
    if (jQuery.trim(e) != "") return e.replace(/[^\w\sàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ]/g, "");
    else return ""
}

function wwm_fb_share(e, t, n, r, i) {
    FB.ui({
        method: "feed",
        name: e,
        link: t,
        picture: n,
        caption: r,
        description: i
    }, function(e) {
        if (e && e.post_id) {} else {}
    })
}

function wwm_common_share(e) {
    window.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=no,height=400,width=600");
    return false
}
jQuery(document).ready(function(e) {

    if(jQuery("#wwm_mode").val() == 0){

     jQuery(document).on({
      mouseenter: function() {
        if(jQuery(this).next('ul.wwm_social_share').length == 0){
                    wid = jQuery(this).css('width');
                    if(jQuery(this).parent().is('a')){
                        jQuery(this).parent().addClass('wwm_socialshare_imagewrapper');
                        jQuery(this).parent().css('width',wid);
                    }else{
                        jQuery(this).wrap('<a style="width:'+wid+'" class="wwm_socialshare_imagewrapper"></a>');
                    }
                    jQuery(this).next('ul.wwm_social_share').remove();
                    jQuery(this).after(jQuery(".wwm_social_share:eq(0)").clone());

        }
        if(jQuery(this).next('ul.wwm_social_share').length == 1){
            jQuery(this).next('ul.wwm_social_share').show();
        }
      }/*,
      mouseleave: function() {
        jQuery(this).next('ul.wwm_social_share').hide();
      }*/
    },'img');

    }

    if(jQuery("#wwm_mode").val() == 0){
        jQuery('body').on('hover',".wwm_socialshare_imagewrapper",function() {
            if (jQuery(this).find(".wwm_social_share").length == 0) {
                jQuery(this).find("img").after(jQuery(".wwm_social_share:eq(0)").clone())
            }
            jQuery(this).find(".wwm_social_share").show()
        }, function() {
            jQuery(".wwm_social_share").hide()
        });
    }
    if(jQuery("#wwm_mode").val() == 1){

        jQuery(".wwm_socialshare_imagewrapper").hover(function() {
        if (jQuery(this).find(".wwm_social_share").length == 0) {
            jQuery(this).find("img").after(jQuery(".wwm_social_share:eq(0)").clone());

            // This section executes only when the force fix is enabled
            if(jQuery("#force_fix").val() == 1){
                //After cloning checking the alignment class alignleft,aligncenter,alignright
                if(jQuery(this).find("img").hasClass('alignleft')){
                    //alignleft is applied so we have to set the share icon with left top or left bottom
                    jQuery(this).find(".wwm_social_share").removeClass('wwm_top_left wwm_top_right wwm_bottom_right wwm_bottom_left wwm_center wwm_center_op').addClass('wwm_top_left');
                }
                if(jQuery(this).find("img").hasClass('alignright')){
                    //align right is applied so we have to set the share icon with right top or right bottom
                    jQuery(this).find(".wwm_social_share").removeClass('wwm_top_left wwm_top_right wwm_bottom_right wwm_bottom_left wwm_center wwm_center_op').addClass('wwm_top_right');
                }
                if(jQuery(this).find("img").hasClass('aligncenter')){
                    //align center is applied so we have to set the share icon with center top or center bottom
                    jQuery(this).find(".wwm_social_share").removeClass('wwm_top_left wwm_top_right wwm_bottom_right wwm_bottom_left wwm_center wwm_center_op').addClass('wwm_center_op');
                }
            }
        }
        jQuery(this).find(".wwm_social_share").show()
        }, function() {
            jQuery(".wwm_social_share").hide()
        });
    }

    var t = !!jQuery.fn.on;
    if (t) {
        jQuery(document).on("click", ".wwm_social_share li", function(e) {
            e.preventDefault();
            execute_wwmfun(this);
        })
    } else {
        jQuery(".wwm_socialshare_imagewrapper .wwm_social_share li").live("click", function(e) {
            e.preventDefault();
            execute_wwmfun(this);
        })
    }
})
