#!/usr/bin/env python3
import json

from stix2 import Bundle, Indicator


def ip_version(ip_str):
    """Determine if IPv4 or v6 based on : in string"""
    if ':' in ip_str:
        return 6
    return 4


def stix_to_dict(stix_obj):
    """convert stix obj repr to python dict through json"""
    s = stix_obj.__str__()
    #print(s)
    return json.loads(s)


if __name__ == "__main__":
    file = 'microsoft_account_login_activity_2020-09-03.json'
    with open(file, 'r') as jsonfile:
        data = json.load(jsonfile)
    #print(data)

    items = data.get("reportItems", [])
    indicators = []
    for item in items:
        ip = item['ip']
        ip_ver = ip_version(ip)
        stix_pattern = "[ipv%d-addr:value = '%s']" % (ip_ver, ip)
        indicator = Indicator(name="Microsoft account login attempt IP",
                          indicator_types = ["anomalous-activity"],
                          pattern=stix_pattern,
                          pattern_type="stix")
        indicators.append(stix_to_dict(indicator))
    
    print(json.dumps(indicators))
