// JavaScript Document

pulloutHeight = -60;
function pulloutForm()
{
	if (pulloutHeight != 0)
	{
		pulloutHeight = pulloutHeight + 5;
		document.getElementById("fixedPullout").style.marginTop = pulloutHeight + 'px';
		setTimeout("pulloutForm()", 20);
	}
}
function closePulloutForm()
{
	if (pulloutHeight != -60)
	{
		pulloutHeight = pulloutHeight - 5;
		document.getElementById("fixedPullout").style.marginTop = pulloutHeight + 'px';
		setTimeout("closePulloutForm()", 20);
	}
}

switchSubVariable = "no";
switchSubVariable2 = " ";
function showSubMenu(switchSubVariable,switchSubVariable2,switchSubVariable3)
{
	if (switchSubVariable == "Submenu 1")
	{
		document.getElementById("shopDepartmentSub").style.display = "block";
		document.getElementById("shopDepartmentBtn").style.backgroundColor = "#556c79";
		
		if (switchSubVariable2 >= 1)
		{
			for (e=1;e<=9;e++)
			{
				document.getElementById('departmentSubBtn1-' + e).style.backgroundColor = "#eeeeee";
				if (e != 9)
				{
					document.getElementById('departmentSubBtn2-' + e).style.display = "none";
				}
			}
			document.getElementById('departmentSubBtn1-' + switchSubVariable2).style.backgroundColor = "#dee5e9";
			if (switchSubVariable2 != 9)
			{
				document.getElementById('departmentSubBtn2-' + switchSubVariable2).style.display = "block";
			}
			if (switchSubVariable3 >= 1)
			{
				for (e=1;e<=11;e++)
				{
					document.getElementById('departmentSubBtn2-' + switchSubVariable2 + '-' + e).style.backgroundColor = "#eeeeee";
					document.getElementById('departmentSubBtn3-' + switchSubVariable2 + '-' + e).style.display = "none";
				}
				document.getElementById('departmentSubBtn2-' + switchSubVariable2 + '-' + switchSubVariable3).style.backgroundColor = "#dee5e9";
				document.getElementById('departmentSubBtn3-' + switchSubVariable2 + '-' + switchSubVariable3).style.display = "block";
			}
		}
	}
	else
	{
		document.getElementById("shopDepartmentSub").style.display = "none";
		document.getElementById("shopDepartmentBtn").style.backgroundColor = "#465c68";
		
		for (e=1;e<=9;e++)
		{
			document.getElementById('departmentSubBtn1-' + e).style.backgroundColor = "#eeeeee";
			if (e != 9)
			{
				document.getElementById('departmentSubBtn2-' + e).style.display = "none";
			}
		}
		for (e=1;e<=11;e++)
		{
			document.getElementById('departmentSubBtn2-8-' + e).style.backgroundColor = "#eeeeee";
			document.getElementById('departmentSubBtn3-8-' + e).style.display = "none";
		}
	}
}
searchTermBaseVariable = "Lighting-Fixtures"
keywordSearchTermVariable = "";
searchPathVariable = "Lighting-Fixtures";
function changeSearchTerm(searchTermTitle,searchTermVar)
{
	searchTermBaseVariable = searchTermVar;
	document.getElementById("shopProductBtn").innerHTML = searchTermTitle;
}
function enterKeyword(keywordVar)
{
	if (keywordVar != "Enter keyword or item number")
	{
		keywordSearchTermVariable = '?itemNumVal=' + keywordVar;
	}
	if (keywordVar == "Enter keyword or item number")
	{
		keywordSearchTermVariable = "";
	}
}
function searchNow()
{
	searchPathVariable = '/' + searchTermBaseVariable + keywordSearchTermVariable;
	window.location = searchPathVariable;
}
function newsletterSubmit(submitFormNum)
{
	document.forms['newsletterSignup' + submitFormNum].submit();
}