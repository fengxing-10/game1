<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>送命题</title>
</head>
<body>
<font size = 3>
<%
	
	String strName=request.getParameter("name");
	String s1=request.getParameter("t1");
	String strTemp ="恭喜"+strName;
	
	try{
		if(strName==""){
			strTemp = "请输入你的姓名";
		}else if(strName.equals("戴金虎")||strName.equals("daijinhu")){
				strTemp="你个出生，输你自己名字";
			}else if(s1.equals("a") || s1.equals("b")){
					strTemp = strTemp + "，你是一个还算有点良心的大sb";
				}else {
						strTemp = strTemp + "，你是一个不折不扣，道德败坏的大sb";
					}							 		
}catch(Exception e){
	if(strName==""){
		strTemp="请输入你的姓名";	
	}else{
	strTemp="请选择你认为最正确的选项";
	}
}		
	
	
	
%>
<%=strTemp %>
	
	
</font>
</body>
</html>