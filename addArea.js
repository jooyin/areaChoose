//地理标签初始化
var suoshiConfig = {
  ajaxUrl = 'http://passport.nuglog.com/jsonstruts/';
}
var addBq = {};
addBq.addDili = function(content){
	$.ajax({
		url:suoshiConfig.ajaxUrl+"queryTagByAdminDivisonParams?dataMap=?",
		dataType:"json",
		type:"post",
		data:{content:content},
		success: function(data){		
			if(data.dataMap.status){
				var list=data.dataMap.data;
				var temp = '<ul class="clearfix">';
				var temp2 = '';
				for(var j=0; j<list.general.length;j++){
					temp2 += '<a href="javascript:;" sk="'+list.general[j].key+'">'+list.general[j].value+'</a>';
				}
				$('#landform .option').html(temp2);
				if(list.geography == undefined){
					$('.area_check:eq(0) .lite[rel=lite]').show();
					$('.area_check:eq(0) .lite[rel=perfect]').hide();
					$('.area_check:eq(0) .tab_perfe').text('我有更完善的资料');
					for(var i = 0,length = list.addrList.length; i < length; i++){
						temp += '<li sid="'+list.addrList[i].id+'" sk="'+list.addrList[i].sk+'">'+list.addrList[i].value+'</li>';
					}
						temp += '</ul>'
					$('.arae_choose_nr:eq(0)').html(temp);
					addBq.addDiliClick();
				}else{
					$('.area_check:eq(0) .lite[rel=lite]').hide();
					$('.area_check:eq(0) .lite[rel=perfect]').show();
					$('.area_check:eq(0) .tab_perfe').text('回到精简版');
					addBq.constsnt.dili = list.adminDivisonSk;
					$('.arae_choose_back span').html(list.geography);
					addBq.constsnt.diliArea = list.geography.split('/');
				}
			}
		}
	})
}
addBq.addDiliSub = function(id,index){
	$.ajax({
		url:suoshiConfig.ajaxUrl+"queryAdminDivisonById?dataMap=?",
		dataType:"json",
		type:"post",
		data:{id:id},
		success: function(data){		
			if(data.dataMap.status){
				var list=data.dataMap.data;
				var temp = '<ul class="clearfix">';
				if(list != null){
					for(var i = 0,length = list.length; i < length; i++){
						temp += '<li sid="'+list[i].id+'" sk="'+list[i].sk+'">'+list[i].value+'</li>';
					}
						temp += '</ul>'
					$('.arae_choose_nr:visible').hide();
					$('.arae_choose_top li.cur').removeClass();
					$('.arae_choose_top li:eq('+ index +')').addClass('cur');
					$('.arae_choose_nr:eq('+index+')').show().html(temp);
					addBq.addDiliClick();
				}
			}
		}
	})
}
addBq.addDiliTag = function(){
	$('.arae_choose_top li').on('click',function(){
		var index = $(this).index();
		$('.arae_choose_nr:visible').hide();
		$('.arae_choose_nr:eq('+ index +')').show();
		$('.arae_choose_top li.cur').removeClass();
		$('.arae_choose_top li:eq('+ index +')').addClass('cur');
	})
}
addBq.addDiliClick = function(){
	$('.arae_choose_nr li').on('click',function(){
		var $nr = $(this).parents('.arae_choose_nr');
		var sid = $(this).attr('sid');
		var index = $nr.index();
		$nr.find('li').removeClass('cur');
		$(this).addClass('cur');
		$nr.nextAll().empty();
		addBq.constsnt.dili = $(this).attr('sk');
		addBq.constsnt.diliArea[index-1]=$(this).text();
		addBq.constsnt.diliArea.splice(index,addBq.constsnt.diliArea.length);
		addBq.addDiliSub(sid,index);
	})
}
addBq.addDiliChecked = function(){
	$('.arae_choose_back span').html(addBq.constsnt.diliArea.join('/'));
}
$(function(){
  addBq.addDili();
})
