/*
Generic Validator Jquery Javascript Library

Created By: Kuldeep Dubey 
*/

(function ( $ ) {
 
    $.fn.allowOnlyNmber = function( options ) {

        var optionsvar = $.extend({
            onerror: function(obj) {}
        }, options );

       $(this).on('keypress', function(event){
            var charCode = (event.which) ? event.which : event.keyCode;
            if(charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 37 || charCode > 40) && charCode != 46){
               optionsvar.onerror(this);
                return false;
            }
            return true;
       });

       $(this).on('paste', function(event){
           if(!(/^[0-9]*$/.test(event.originalEvent.clipboardData.getData('Text')))){
               return false;
           }
       });
    };

    $.fn.allowOnlyChar = function(options){

        var optionsvar = $.extend({
                onerror: function(obj) {}
        }, options );

        $(this).on('keypress', function(event){
            var charCode = (event.which) ? event.which : event.keyCode;
            if(charCode > 31 && (charCode < 48 || charCode > 57)){
                return true;
            }else{
                optionsvar.onerror(this);
                return false;
            }
       });

       $(this).on('paste', function(event){
           if(/\d/g.test(event.originalEvent.clipboardData.getData('Text'))){
               return false;
           }
       });
    };

    $.fn.checkForEmail = function(options){
        var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        var optionsvar = $.extend({
            onerror: function(obj) {}
        }, options );

        $(this).on('keyup', function(event){
            if($(this).val().indexOf('@') > -1 && !emailPattern.test($(this).val())){
               $(this).addClass('error-email');
            }else{
                $(this).removeClass('error-email');
            }
        });

        $(this).on('blur', function(){
            if($(this).val().trim() != '' && !comparePattern(emailPattern, $(this).val())){
                $(this).addClass('error-email');
            }else{
                $(this).removeClass('error-email');
            }
        });

    };

    $.fn.checkForNull = function(options){
    
        var optionsvar = $.extend({
            setFocus: false
        }, options);


        $(this).on('blur', function(){
            if($(this).val()  == null || $(this).val().trim() == ''){
                $(this).addClass('error-null');
                if(optionsvar.setFocus){
                    $(this).focus();
                }
            }else{
                $(this).removeClass('error-null');
            }
        });
    };

    $.fn.checkForLength = function(options){

        var optionsvar = $.extend({
            min: 0,
            max: null,
            setFocusOnMin: false
        }, options);

        $(this).on('keypress', function(){
            if(optionsvar.max != null && $(this).val().length >= optionsvar.max){
                return false;
            }
        });

        $(this).on('keyup', function(event){
            $(this).val($(this).val().substring(0,optionsvar.max));
        });

        $(this).on('blur', function(event){
            if($(this).val().length < optionsvar.min){
                $(this).addClass('error-min');
                if(optionsvar.setFocusOnMin){
                    $(this).focus();
                }
            }
        });
    };

    $.fn.checkForContactNumber = function(options){

        var mobileNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;

        var optionsvar = $.extend({
            onerror: function(obj) {}
        }, options );

        $(this).on('blur', function(){
            if($(this).val().trim() != '' && !comparePattern(mobileNumber, $(this).val())){
                $(this).addClass('error-mobile');
            }else{
                $(this).removeClass('error-mobile');
            }
        });
    };

    function comparePattern(pattern, str){
        if(pattern.test(str)){
            return true;
        }
        return false;
    }
 
}( jQuery ));