#pragma strict

public var panel: GameObject;
public var visibility: boolean;

function Clicked () 
{
	visibility = !visibility;
	panel.SetActive(visibility);
}
