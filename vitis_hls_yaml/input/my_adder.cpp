#include <ap_int.h>

void my_adder(ap_uint<8> a, ap_uint<8> b, ap_uint<8>& sum) {
    sum = a - b;
}
