
$(function(){

});


$('#handClock').form({
    //url:,
    onSubmit: function(){
        // do some check
        // return false to prevent submit;
        alert(1);
    },
    success:function(data){
        alert(data)
    },
    error:function(data){
        alert(2)
    }
});