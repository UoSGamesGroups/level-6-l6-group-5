#pragma strict

public var num: int;
public var textObj: Text;
public var clickedNum: int;

function Clicked () 
{
	textObj.text = "You can obtain this item at zone " + num;
	clickedNum ++;
	if(this.gameObject.activeSelf)
	{
		Close(clickedNum);
	}
}


function Close(clicked: int)
{
	yield WaitForSeconds(1);
	if(clickedNum == clicked)
	{
		this.gameObject.SetActive(false);
	}
}