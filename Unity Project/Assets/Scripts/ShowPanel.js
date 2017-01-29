#pragma strict

public var panel: GameObject;
public var visibility: boolean;
public var isCosmetic: boolean;

function Start()
{
	if(isCosmetic)
	{
		panel.GetComponent(IsPanelOpen).OpenAll();
		yield WaitForSeconds(0.01);
		panel.GetComponent(IsPanelOpen).CloseAll();
		panel.SetActive(false);
	}
}

function Clicked () 
{
	if(!isCosmetic)
	{
		visibility = !visibility;
		panel.SetActive(visibility);
	}
	else if(isCosmetic)
	{
		panel.GetComponent(IsPanelOpen).CloseAll();
		visibility = !visibility;
		panel.SetActive(visibility);
	}
}	
