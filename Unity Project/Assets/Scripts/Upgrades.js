#pragma strict

public var visible: boolean;
public var panel: GameObject;

function Start () 
{

}

function Update () 
{

}

function Clicked () 
{
	visible = !visible;
	panel.SetActive(visible);
}
