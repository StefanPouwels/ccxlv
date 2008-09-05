#!/usr/bin/python2.3

from fcgi import WSGIServer
import os, sys

def test_app(environ, start_response):
	"""Probably not the most efficient example."""
	import cgi
	start_response('200 OK', [('Content-Type', 'text/html')])
	yield """<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
	<html>
	<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="../../css/style.css">
	</head>
	<body>
	<table cellspacing="0" cellpadding="0" border="0">
	<tr class="subhead" align="Left"><th>Name</th><th>Value</th></tr>"""
	names = environ.keys()
	names.sort()
	cl = ('normal','alt')
	i = 0
	for name in names:
		if not name.find("HTTP") or not name.find("REQUEST") or not name.find("wsgi."):
			yield '<tr class="%s"><td>%s</td><td>%s</td></tr>\n' % (cl[i%2],
				name, cgi.escape(`environ[name]`))
			i = i+1
	yield '</table>\n' \
		'</body></html>\n'

WSGIServer(test_app).run()
