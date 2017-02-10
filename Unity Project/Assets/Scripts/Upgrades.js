#pragma strict

public var visibility: boolean;
public var panel: GameObject;
public var wood: Text;
public var cloth: Text;
public var metal: Text;

function Update () 
{
	wood.text = PlayerPrefs.GetInt("Wood").ToString();
	cloth.text = PlayerPrefs.GetInt("Cloth").ToString();
	metal.text = PlayerPrefs.GetInt("Metal").ToString();
}

function Clicked () 
{
	visibility = !visibility;
	panel.SetActive(visibility);
}
